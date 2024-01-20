from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from VectorStoreConstructor import Chain
from OpenaiClient import OpenaiClient

# Initialize FastAPI
app = FastAPI()

load_dotenv()

chain = Chain()
chatbot = OpenaiClient()

# Configure CORS to allow requests from your web application's domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text: str


@app.post("/api/chatbot")
def chatbot_endpoint(input_data: InputText):
    try:
        print("Received Input Data:", input_data)
        response = chatbot.query(input_data.text)
        return {"response": response}
    except Exception as e:
        print("Exception:", e)
        return {"response": "An error occurred during processing."}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"./docs/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    chain.constructChain()
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
        chain.constructChain()
        return {"message": f"File '{filename}' successfully deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == "__main__":
    chain.constructChain()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)