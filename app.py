from gpt_index import (
    SimpleDirectoryReader,
    GPTListIndex,
    GPTSimpleVectorIndex,
    LLMPredictor,
    PromptHelper,
)
from langchain.chat_models import ChatOpenAI
import gradio as gr
import sys
import os
import boto3
import glob

os.environ["OPENAI_API_KEY"] = "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"

# Create docs directory if it doesn't exist
if not os.path.exists("./docs"):
    os.makedirs("./docs")
else:
    # Delete all files in ./docs folder
    files = glob.glob("./docs/*")
    for f in files:
        os.remove(f)

# Initialize boto3 client
s3 = boto3.client("s3")

# Download the file from S3 and save it to ./docs
s3.download_file(
    "qol-lab-research", "QoLT lab_research.txt", "./docs/QoLT_lab_research.txt"
)


def construct_index():
    # Your existing code
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


iface = gr.Interface(
    fn=chatbot,
    inputs=gr.components.Textbox(lines=1, label="Enter your text"),
    outputs="text",
    title="Quality of Life Technology Chatbot",
)

index = construct_index()
iface.launch(share=True)
