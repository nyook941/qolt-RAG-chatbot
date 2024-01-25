import os
import openai
from llama_index import download_loader
from langchain_openai import OpenAI
from langchain.chains.question_answering import load_qa_chain
import json

from dotenv import load_dotenv, find_dotenv


def lambda_handler(event, context):
    try:
        print("event", event)
        body = json.loads(event['body'])
        question = body['question']
        print("Received Input Data:", question)
        load_dotenv(find_dotenv())

        S3Reader = download_loader(loader_class="S3Reader", custom_path="/tmp")
        loader = S3Reader(bucket="test-24598", 
                          aws_access_id= os.environ.get('ACCESS_KEY_ID'), 
                          aws_access_secret=os.environ.get('SECRET_ACCESS_KEY'))

        openai.api_key = os.environ.get('OPENAI_API_KEY')
        documents = loader.load_data()

        langchain_documents = [d.to_langchain_format() for d in documents]

        llm = OpenAI(temperature=0)
        qa_chain = load_qa_chain(llm)
        answer = qa_chain.invoke({'input_documents':langchain_documents, 'question':question})        

        response = answer['output_text']

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"  
            },
            "body": json.dumps({'output_text':response})
        }
    except Exception as e:
        print("Exception:", e)
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"  
            },
            "body": {"response": "An error occurred during processing."}
        }