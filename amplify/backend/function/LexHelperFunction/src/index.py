import json

microsoft_services = ['windows', 'sql']

def check_word_in_array(word, array, excluded_items):
    for item in array:
        if item in excluded_items:
            continue  # Skip excluded items
        if word.lower() == item.lower():
            return True
    return False

def validate_service(slots, intent):
    if intent == 'WindowsRequest':
        for word in slots['windows_service']['value']['originalValue'].split(): # We check the input service the user enters
            print(f"This is the word banned: sql and this is the word read: {word}")
            if check_word_in_array(word, microsoft_services, ['windows']):
                return {
                    'isValid': False
                    }
    elif intent == 'SqlRequest':
        for word in slots['windows_service']['value']['originalValue'].split(): # We check the input service the user enters
            print(f"This is the word banned: windows and this is the word read: {word}")
            if check_word_in_array(word, microsoft_services, ['sql']):
                return {
                    'isValid': False
                    }

    return {
            'isValid': True
        }

def lambda_handler(event, context):
    print(event)

    bot = event['bot']['name']
    slots = event['sessionState']['intent']['slots']
    intent = event['sessionState']['intent']['name']

    query_validation_result = validate_service(slots, intent)
    print(query_validation_result["isValid"])

    if event['invocationSource'] == 'DialogCodeHook': # Response to which services the user is using is on FulfillmentCodeHook
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
    else:
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
            }
        }


    print(response)
    return response