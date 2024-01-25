import os
import openai
import sys
sys.path.append('../..')
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

class OpenaiClient:
    def __init__(self):
        load_dotenv(find_dotenv())

        openai.api_key = os.environ.get('OPENAI_API_KEY')

        embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vectordb = Chroma(
            persist_directory="docs/chroma", 
            embedding_function=embedding_function
        )
        self.llm_name = "gpt-3.5-turbo"

    def query(self, question):
        llm = ChatOpenAI(model_name=self.llm_name, temperature = 0)

        template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Use three sentences maximum. Keep the answer as concise as possible. 
        {context}
        Question: {question}
        Helpful Answer:"""
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever = self.vectordb.as_retriever(),
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )

        result = qa_chain.invoke({"query": question})

        return result["result"]