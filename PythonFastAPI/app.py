

from fastapi import FastAPI
from pydantic import BaseModel

from gpt_index import (
    SimpleDirectoryReader,
    GPTListIndex,
    GPTSimpleVectorIndex,
    LLMPredictor,
    PromptHelper,
)
from langchain.chat_models import ChatOpenAI
import os
import boto3
import glob

# Initialize FastAPI
app = FastAPI()

# Set OpenAI API Key
os.environ["OPENAI_API_KEY"] = "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"

def construct_index():
    # Your existing code for constructing the index
    max_input_size = 4096
    num_outputs = 512
    max_chunk_overlap = 20
    chunk_size_limit = 600

    prompt_helper = PromptHelper(
        max_input_size,
        num_outputs,
        max_chunk_overlap,
        chunk_size_limit=chunk_size_limit,
    )
    llm_predictor = LLMPredictor(
        llm=ChatOpenAI(
            temperature=0.7, model_name="gpt-3.5-turbo", max_tokens=num_outputs
        )
    )

    # Read documents using SimpleDirectoryReader
    documents = SimpleDirectoryReader("./docs").load_data()

    index = GPTSimpleVectorIndex(
        documents, llm_predictor=llm_predictor, prompt_helper=prompt_helper
    )
    index.save_to_disk("index.json")

    return index


def chatbot(input_text):
    index = GPTSimpleVectorIndex.load_from_disk("index.json")
    response = index.query(input_text, response_mode="compact")
    return response.response


class InputText(BaseModel):
    text: str


@app.post("/api/chatbot")
def chatbot_endpoint(input_data: InputText):
    response = chatbot(input_data.text)
    return {"response": response}


if __name__ == "__main__":
    index = construct_index()
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
