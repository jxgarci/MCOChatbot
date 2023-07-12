import json
import boto3
import json

reference_engine_client = boto3.client('lambda')

windows_services = ['windows', 'wec2', 'wec']
sql_services = ['sql', 'mssql']
microsoft_services = windows_services + sql_services

def check_word_in_array(word, array, excluded_items):
    """
    Function for checking that "word" being read is not contained in "array", except the ones from "excluded_items"
    """
    for item in array:
        if item in excluded_items:
            continue  # Skip excluded items
        if word.lower() == item.lower():
            return True
    return False

def validate_service(slots, intent):
    """
    Function for checking there is no overlapping intents
    """
    if intent == 'WindowsRequest':
        for word in slots['windows_service']['value']['originalValue'].split(): # We check the input service the user enters
            print(f"These are the words banned: {sql_services} and this is the word read: {word}")
            if check_word_in_array(word, microsoft_services, windows_services):
                return {
                    'isValid': False
                    }
    elif intent == 'SqlRequest':
        for word in slots['sql_service']['value']['originalValue'].split(): # We check the input service the user enters
            print(f"These are the words banned: {windows_services} and this is the word read: {word}")
            if check_word_in_array(word, microsoft_services, sql_services):
                return {
                    'isValid': False
                    }

    return {
            'isValid': True
        }

def lambda_handler(event, context):
    # Setting the bot variables
    bot = event['bot']['name']
    slots = event['sessionState']['intent']['slots']
    intent = event['sessionState']['intent']['name']
    
    # Responding to the bot
    if event['invocationSource'] == 'DialogCodeHook': 
        # Validating the intent
        query_validation_result = validate_service(slots, intent)
        # Generating response
        if not query_validation_result['isValid']: # In case the validation was NOT correctly attempted
            if 'message' in query_validation_result: # In case the validation has a custom message
                response = {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Close"
                        },
                        "intent": {
                            "name": "OptimizationRequest",
                            "state": "InProgress"
                        },
                        "state": "ReadyForFulfillment",
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": query_validation_result['message']
                        }
                    ]
                }
            else: # In case the validation has NOT a custom message -> suggest the user to provide a message for each service one by one
                response = {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Close"
                        },
                        "intent": {
                            "name": "OptimizationRequest",
                            "state": "InProgress"
                        },
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": "I suggest providing each service query one by one. Optimizing them together may require an agent help."
                        }
                    ]
                }
        else: # In case the validation WAS correctly attempted
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
        if event['sessionState']['intent']['name'] == 'WindowsRequest':
            query = {'Query': event['sessionState']['intent']['slots']['windows_service']['value']['originalValue']}
        elif event['sessionState']['intent']['name'] == 'SqlRequest':
            query = {'Query': event['sessionState']['intent']['slots']['sql_service']['value']['originalValue']}
            
        reference = reference_engine_client.invoke(
            FunctionName = 'arn:aws:lambda:eu-west-2:942380459501:function:referenceEngineHandler',
            InvocationType = 'RequestResponse ',
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
                other_resources_uris.append(ref["DocumentURI"])
            # Preparing the message
            info = f"This is a summary from {title}:\n\n{summary}\n"
            footer = f"\nResource reference:\n{resource_ref}\nOther related resources:\n{'      '.join(other_resources_uris)}"
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