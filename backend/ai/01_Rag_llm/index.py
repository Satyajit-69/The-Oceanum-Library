import os
from dotenv import load_dotenv
load_dotenv()  # 👈 this loads .env into environment

from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore

# 1) Load PDF
pdf_path = Path(__file__).parent / "notes.pdf"
loader = PyPDFLoader(str(pdf_path))
docs = loader.load()

# 2) Split PDF into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=300
)
chunks = splitter.split_documents(docs)

# 3) Gemini Embeddings
embedder = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001"   
)

# 4) Store in Qdrant
vector_store = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedder,
    url="http://localhost:6333",
    collection_name="notes_2"
)

print("✅ PDF indexed successfully using Gemini embeddings!")
