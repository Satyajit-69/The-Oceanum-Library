
import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore

# Load .env
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is missing from .env")

#  Load PDF
pdf_path = Path(__file__).parent / "notes.pdf"

if not pdf_path.exists():
    raise FileNotFoundError(f"PDF not found: {pdf_path}")

loader = PyPDFLoader(str(pdf_path))
docs = loader.load()

if not docs:
    raise ValueError("No pages found in the PDF")

print(f"Pages loaded: {len(docs)}")

#  Split PDF into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=300,
    add_start_index=True,
)

chunks = splitter.split_documents(docs)
print(f"Chunks created: {len(chunks)}")

#  Generate embeddings
embedder = OpenAIEmbeddings(
    model="text-embedding-3-small",
    api_key=api_key,
)

# Store chunks in Qdrant
vector_store = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedder,
    url="http://localhost:6333",
    collection_name="notes_new",
)

print("PDF indexed successfully!")
