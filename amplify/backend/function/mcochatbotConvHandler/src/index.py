import os
import uuid
import boto3
import json
from botocore.config import Config

# Obtaining a session for interacting with Boto3 API - ONLY USE THIS IN CASE RUNNING IN LOCAL
# session = boto3.Session(
#     aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID'),
#     aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
# )
# client = session.client('lexv2-runtime', config=my_config)

# Seting up the configuration for the API call
my_config = Config(
    region_name = 'eu-west-2',
    signature_version = 'v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)
# Creating a client for the API call
client = boto3.client('lexv2-runtime', config=my_config)

# Create a new session - BOT ALIAS MAY CHANGE IF LEX BOT ALIAS GETS UPDATED
bot_name = '9LMWBBNMCK' # MCOChatbot
bot_alias = 'PVNWCYHVYJ' # MCOChatbot_v9
session_id = uuid.uuid4()
client.put_session(
    botId=bot_name,
    botAliasId=bot_alias,
    localeId='en_US',
    sessionId=str(session_id),
    sessionState={
        "dialogAction": {
            "type": "Delegate"
        },
        "intent": {
            "name": "Greetings",
        },
        "activeContexts": [
        {
            "name": "OptimizationRequest",
            "timeToLive": {
            "timeToLiveInSeconds": 180,
            "turnsToLive": 5
            },
            "contextAttributes": {}
        },
        {
            "name": "WindowsRequest",
            "timeToLive": {
            "timeToLiveInSeconds": 180,
            "turnsToLive": 5
            },
            "contextAttributes": {}
        },
        {
            "name": "SqlRequest",
            "timeToLive": {
            "timeToLiveInSeconds": 180,
            "turnsToLive": 5
            },
            "contextAttributes": {}
        }
        ]
    }
)

def handler(event:dict, context):
    """
    Lambda function that processes the request from the API Gateway.
    :param event: The event passed to the lambda function from the API.
    :param context: The context passed to the lambda function.
    :return: The response from Lex chatbot.
    """
    print(f'received event: {event}')
    message = event['body'][1:-1] # Remove the surrounding quotes
    print(f'received message: {message}')
    
    # Send to the bot the text received from user
    response = client.recognize_text(
        botId=bot_name,
        botAliasId=bot_alias,
        localeId='en_US',
        sessionId=str(session_id),
        text=message
    ) 

    print(f'received response: {response}')
    
    # Return the response from Lex chatbot
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response['messages'][0]['content'])
    }
