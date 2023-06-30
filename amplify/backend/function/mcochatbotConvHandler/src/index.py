import json

def handler(event, context):
  print('received event:')
  print(event)
  print(f"received message: {event['body']}")
  message = event['body']
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(message)
  }