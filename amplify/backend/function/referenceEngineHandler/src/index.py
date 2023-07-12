import json
import boto3
import os
import time
import requests
import re

newline, bold, unbold = '\n', '\033[1m', '\033[0m'
# Sagemaker objects: secondary and emergency endpoints are only used in case the main one doesn't work due to any error
main_endpoint_name = 'jumpstart-dft-hf-summarization-bart-large-cnn-samsum-2' # ml.p3.2xlarge
secondary_endpoint_name = 'jumpstart-dft-hf-summarization-bart-large-cnn-samsum-3' # ml.p3.2xlarge
emergency_endpoint_name = 'jumpstart-dft-hf-summarization-bart-large-cnn-samsum-1' # ml.m5.large

sagemaker = boto3.client('runtime.sagemaker')

# Kendra objects
index_id = '4e1f135a-e872-412f-a05c-5f6ecaf67a1d'
kendra = boto3.client('kendra')

# ---------------------------------------- FUNCTIONS FOR DATA EXTRACTION ----------------------------------------
def obtain_md_text(url):
    """
    Function that makes a GET request to the url provided and returns the text of the .md file.
    :param url: The url of the .md file.
    :return: The text of the .md file.
    :rtype: str
    """
    # Find the current number for md document url
    number_url = 'https://static.us-east-1.prod.workshops.aws/public/quicklinks/msft-costopt/published.json'
    response = requests.get(url=number_url)
    number = json.loads(response.text)['current']
    
    # Find the part after 'en-US/'
    match = re.search(r'en-US/(.*)', url)
    if match:
        part_after_en_us = match.group(1)
    else:
        part_after_en_us = ''

    # Trying to obtain index.md from the source
    try: 
        new_md_url = f'https://static.us-east-1.prod.workshops.aws/public/{number}/content/{part_after_en_us}/index.en.md'
        response = requests.get(url=new_md_url)
        if response.status_code == 403:
            raise SyntaxError
    except SyntaxError: # Case there is no index.en.md
        new_md_url = f'https://static.us-east-1.prod.workshops.aws/public/{number}/content/{part_after_en_us}.en.md'

    # Making the request
    response = requests.get(url=new_md_url)
    if response.status_code == 200:
        return response.text
    return ''
        
def chunk_text(input_text):
    """
    Function for chunking the data to pass it to the summarisation model
    """
    # First separate sentences
    input_text = input_text.replace('.', '.<eos>')
    input_text = input_text.replace('!', '.<eos>')
    input_text = input_text.replace('?', '.<eos>')
    sentences = input_text.split('<eos>')
    # Forming the chunks
    max_chunk = 300 # 300 words per chunk
    current_chunk = 0
    chunks = []
    # Aggregating the sentences into the chunks
    for sentence in sentences:
        if len(chunks) == current_chunk + 1:
            if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk: 
                # In case there is space for the sentence in the chunk
                chunks[current_chunk].extend(sentence.split(' '))
            else:
                # No space for the sentence -> new chunk
                current_chunk += 1
                chunks.append(sentence.split(' '))
        else:
            chunks.append(sentence.split(' '))
    # We form a text within the chunk
    for chunk_id in range(len(chunks)):
        chunks[chunk_id] = ' '.join(chunks[chunk_id])
    
    return chunks

# ---------------------------------------- FUNCTIONS FOR DATA SUMMARISATION ----------------------------------------

def query_endpoint(encoded_text):
    """
    Function to query the SageMaker summarisation endpoint. It first tries the first endpoint, if not it tries invoking the secondary and emergency.
    In case no endpoint is accesible it will return empty string
    """
    try:
        response = sagemaker.invoke_endpoint(EndpointName=main_endpoint_name, ContentType='application/x-text', Body=encoded_text)
        return response
    except:
        print("ERROR: MAIN ENDPOINT NOT AVAILABLE")
        response = ''
    
    try:
        response = sagemaker.invoke_endpoint(EndpointName=secondary_endpoint_name, ContentType='application/x-text', Body=encoded_text)
        return response
    except:
        print("ERROR: SECONDARY ENDPOINT NOT AVAILABLE")
        response = ''
        
    try:
        response = sagemaker.invoke_endpoint(EndpointName=emergency_endpoint_name, ContentType='application/x-text', Body=encoded_text)
    except:
        print("ERROR: EMERGENCY ENDPOINT NOT AVAILABLE")
        response = ''
        
    return response
    

def parse_response(response):
    """
    Function to parse the response to the query for the SageMaker summarisation endpoint
    """
    model_predictions = json.loads(response['Body'].read())
    return model_predictions['summary_text']

def lambda_handler(event, context):
    """
    Function that handles the reference engine logic. 
    In case sagemaker is not able to retrieve any information, document excerpt from kendra will be returned
    """
    # Calling kendra to return results that match user query
    response = kendra.query(
        QueryText = event['Query'],
        IndexId = index_id
    )
    print(response)
    result = {}
    try:
        result = response['FeaturedResultsItems'][0]
    except KeyError:
        result = response['ResultItems'][0]
    
    # After receiving the first URL provided by kendra, we obtain the text from it
    input_text = obtain_md_text(url=result['DocumentURI'])
    
    # Chunking the text to enable summarisation
    chunks = chunk_text(input_text)
    summary_text = []
    for chunk in chunks:
        # Calling the endpoint of SageMaker summarisation model
        query_response = query_endpoint(chunk.encode('utf_8'))
        if query_response == '': # Case in which the SageMaker endpoints are not available
            summary_text = ['']
            break
        # Parsing the response and obtaining sumary text
        response_text = parse_response(query_response)

        summary_text.append(response_text)
    
    # Responding to the request
    if summary_text == ['']: # Case in which the SageMaker endpoints are not working properly
        try:
            summary_text_str = result['DocumentExcerpt']['Text']
        except KeyError: # In case kendra also fails to retrieve information
            summary_text_str = 'There have been some issues trying to obtain information for your request. Try to contact optimize-microsoft@amazon.com if you need help'
            return {
                'statusCode': 200,
                'body': json.dumps({'ErrorMessage': summary_text_str })
            }
    else:
        summary_text_str = ' '.join(summary_text)
    other_resources = response['ResultItems'][1:4]
    body = {
        'Title': result['DocumentTitle']['Text'],
        'Summary': summary_text_str, # Summary of the first result
        'Resource': result['DocumentURI'],
        'OtherResources': other_resources # Other results
    }

    print("###########SUMMARY############")
    print(summary_text_str)
    
    return {
        'statusCode': 200,
        'body': json.dumps(body)
    }
    