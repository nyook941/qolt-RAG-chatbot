import sys
sys.path.append('../..')
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

class Chain:
    def __init__(self):
        self.documents = None
        self.documents = None
        self.vectordb = None

    def load(self):
        loader = DirectoryLoader('docs', glob="**/*.txt")
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