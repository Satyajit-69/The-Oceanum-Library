
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

load_dotenv()

VECTOR_DB_DIR = "vector_db"


def ingest_pdf(pdf_path: str, collection_name: str) -> bool:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY missing")

    if not os.path.isfile(pdf_path):
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    # 1. Initialize OpenAI embeddings
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        api_key=api_key,
    )

    # 2. Load PDF
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    if not docs:
        raise ValueError("No pages found in PDF")

    # 3. Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        add_start_index=True,
    )

    chunks = splitter.split_documents(docs)
    chunks = [chunk for chunk in chunks if chunk.page_content.strip()]

    if not chunks:
        raise ValueError("No text found in PDF")

    print(f"Pages loaded: {len(docs)}")
    print(f"Chunks created: {len(chunks)}")

    # 4. Store in persistent Chroma database
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DB_DIR,
        collection_name=collection_name,
    )

    print("PDF ingested successfully!")
    return True
