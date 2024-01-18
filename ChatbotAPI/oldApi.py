from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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
from dotenv import load_dotenv

# Initialize FastAPI
app = FastAPI()

load_dotenv()

# Configure CORS to allow requests from your web application's domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is not set")


def construct_index():
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
    try:
        print("Received Input Data:", input_data)  # Log the received data
        response = chatbot(input_data.text)
        return {"response": response}
    except Exception as e:
        print("Exception:", e)  # Log any exceptions
        return {"response": "An error occurred during processing."}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"./docs/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    index = construct_index()
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}


@app.get("/api/files")
def files_endpoint():
    folder_path = "./docs"
    file_list = os.listdir(folder_path)
    return file_list

@app.delete("/api/remove-file/{filename}")
def remove_file(filename: str):
    file_path = f"./docs/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        os.remove(file_path)
        index = construct_index()
        return {"message": f"File '{filename}' successfully deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == "__main__":
    index = construct_index()
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)