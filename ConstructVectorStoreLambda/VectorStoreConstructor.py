import sys
sys.path.append('../..')
from langchain_community.document_loaders import S3FileLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
import boto3

class Chain:
    def __init__(self):
        self.documents = None
        self.documents = None
        self.vectordb = None

    def load(self):
        bucket_name = "quality-of-life-technologies-docs"
        object_key = "qolt.txt"
        loader = S3FileLoader(bucket_name, object_key)
        self.documents = loader.load()
        print("\033[32mINFO:\033[0m\tdocument(s) loaded")

    def split(self):
        text_splitter = CharacterTextSplitter(chunk_size = 1000, chunk_overlap = 0)
        self.documents = text_splitter.split_documents(self.documents)

    def embedVectors(self):
        embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vectordb = Chroma.from_documents(self.documents, embedding_function, persist_directory='docs/chroma/')
    
    def constructChain(self):
        self.load()
        self.split()
        self.embedVectors()
        print("\033[32mINFO:\033[0m\tchain created")
        print("\033[32mINFO:\033[0m\tvector store len:", self.vectordb._collection.count())

class S3Uploader:
    def __init__(self):
        self.s3_client = boto3.client('s3')
        self.bucket_name = "quality-of-life-technologies-vector-store"
        self.object_key = ""
        self.file_path = ""

    def upload(self):
        self.s3_client.upload_file(self.file_path, self.bucket_name, self.object_key)
        print("\033[32mINFO:\033[0m\tVector store uploaded to S3")


        