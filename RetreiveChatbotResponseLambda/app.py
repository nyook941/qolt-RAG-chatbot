import json
from OpenaiClient import OpenaiClient

def lambda_handler(event, context):
    try:
        openaiClient = OpenaiClient()
        question = event['body']['question']

        print("Received Input Data:", question)
        response = openaiClient.query(question)
        return {
            "statusCode": 200,
            "body": json.dumps({"response":response})
        }
    except Exception as e:
        print("Exception:", e)
        return {
            "statusCode": 500,
            "body": {"response": "An error occurred during processing."}
        }

data = {"body": {"question": "who is professor tamil?"}}
response = lambda_handler(data, "hello")
print(response)
