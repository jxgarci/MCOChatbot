import json
import boto3
import json

# Lambda client
reference_engine_client = boto3.client('lambda')
REFERENCE_ENGINE_ARN = 'arn:aws:lambda:eu-west-2:942380459501:function:referenceEngineHandler'

def lambda_handler(event, context):
    print(event)
    # Setting the bot variables
    slots = event['sessionState']['intent']['slots']
    intent = event['sessionState']['intent']['name']
    
    # Responding to the bot
    if event['invocationSource'] == 'DialogCodeHook': 
        # Generating response
        response = {
            "sessionState": {
                "dialogAction": {
                    "type": "Delegate"
                },
                "intent": {
                    'name': intent,
                    'slots': slots
                }
            }
        }
    else: # Case of Fulfillment code hook
        # Calling the reference engine to get the summary and resources
        query = {'Query': event['sessionState']['intent']['slots'][f'{intent}_service']['value']['originalValue']}
            
        reference = reference_engine_client.invoke(
            # NOTE: the function is pointing to a version of the referenceEngineHandler not the latest one
            FunctionName = REFERENCE_ENGINE_ARN,
            InvocationType = 'RequestResponse',
            Payload = json.dumps(query)
        )
        response_payload = json.loads(reference['Payload'].read().decode("utf-8"))
        print(response_payload)
        
        body = json.loads(response_payload['body'])
        try: # In case the reference engine could retrieve information regarding the query
            title = body['Title']
            summary =  body['Summary']
            resource_ref = body['Resource']
            other_resources = body['OtherResources']
            
            other_resources_uris = []
            # Obtaining all the uris from related resources
            for ref in other_resources:
                if ref["DocumentURI"] not in other_resources_uris and ref["DocumentURI"] != resource_ref:
                    other_resources_uris.append(ref["DocumentURI"])
            # Preparing the message
            info = f"This is a summary from {title}:\n\n{summary}\n"
            footer = f"\nResource reference:\n\n{resource_ref}\n" + "Other related resources:\n\n%s" % '\n\n'.join(other_resources_uris)
            message = info + footer
            
        except KeyError: # Error case when reference engine is completely unavailable
            message = body['ErrorMessage']
        
        # Generating the response 
        response = {
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": intent,
                    "slots": slots,
                    "state": "Fulfilled"
                }
            },
            "messages": [
                {
                    "contentType": "PlainText",
                    "content": message
                }
            ]
        }


    print(response)
    return response