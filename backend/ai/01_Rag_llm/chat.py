
import os
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is missing from .env")

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    api_key=api_key,
)

texts = [
    "LangChain is a framework for building context-aware applications.",
    "Retrieval-Augmented Generation uses retrieved documents to ground LLM answers.",
    "Vector databases store embeddings and enable semantic similarity search.",
]

vectorstore = InMemoryVectorStore.from_texts(
    texts,
    embedding=embeddings,
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

question = "What is RAG?"
documents = retriever.invoke(question)

for document in documents:
    print(document.page_content)
