import os
from dotenv import load_dotenv

# 🔥 LOAD ENV FIRST 
load_dotenv()

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

VECTOR_DB_DIR = "vector_db"

def ingest_pdf(pdf_path: str, collection_name: str):
    # Validate API key first
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables")
    
    print(f"✅ API Key loaded: {api_key[:10]}...")
    
    # Initialize embeddings inside function
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=api_key
    )
    
    # Load and validate PDF
    print(f"📄 Loading PDF: {pdf_path}")
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found: {pdf_path}")
    
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()
    
    if not docs:
        raise ValueError(f"No documents loaded from {pdf_path}")
    
    print(f"✅ Loaded {len(docs)} pages")
    
    # Debug: Check if pages have content
    total_chars = sum(len(doc.page_content) for doc in docs)
    print(f"📊 Total characters extracted: {total_chars}")
    
    if total_chars == 0:
        raise ValueError("PDF loaded but contains no extractable text. It might be a scanned image-based PDF.")
    
    # Check first page content
    print(f"📝 First page preview: {docs[0].page_content[:200]}...")

    # Split documents
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=300,
        length_function=len,
        separators=["\n\n", "\n", " ", ""]
    )
    
    chunks = splitter.split_documents(docs)
    
    print(f"🔪 Raw chunks created: {len(chunks)}")
    
    if not chunks:
        # Fallback: Create chunks manually if splitter fails
        print("⚠️ Splitter returned empty, creating manual chunks...")
        chunks = []
        for doc in docs:
            if doc.page_content.strip():
                # Split by character count if splitter fails
                text = doc.page_content
                for i in range(0, len(text), 1000):
                    chunk_text = text[i:i+1000]
                    if chunk_text.strip():
                        from langchain.schema import Document # type: ignore
                        chunks.append(Document(
                            page_content=chunk_text,
                            metadata=doc.metadata
                        ))
    
    print(f"✅ Created {len(chunks)} chunks")
    
    # Filter out empty chunks
    chunks = [chunk for chunk in chunks if chunk.page_content.strip()]
    
    if not chunks:
        raise ValueError("All chunks are empty after filtering")
    
    print(f"✅ {len(chunks)} non-empty chunks ready for embedding")
    

    # Create vector store
    print("🔄 Creating embeddings and vector store...")
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DB_DIR,
        collection_name=collection_name
    )

    print("✅ Vector database created and persisted successfully!")
    return vectordb