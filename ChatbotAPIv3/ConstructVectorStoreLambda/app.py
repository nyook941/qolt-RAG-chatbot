import json
from VectorStoreConstructor import Chain

def lambda_handler(event, context):
    try:
        chain = Chain().constructChain()
        return {
            "statusCode": 200,
            "body": {"response: Vector store created and uploaded on EC2"}
        }
    except Exception as e:
        print("Exception:", e)
        return {
            "statusCode": 500,
            "body": {"response": "An error occurred during processing."}
        }
    
response = lambda_handler("hello", "world")
