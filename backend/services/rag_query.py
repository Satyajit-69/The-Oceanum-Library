import os
from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

VECTOR_DB_DIR = "vector_db"

# ✅ SAME embedding model as ingestion
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def answer_from_pdf(question: str, pdf_id: str) -> str:
    vectordb = Chroma(
        persist_directory=VECTOR_DB_DIR,
        collection_name=pdf_id,
        embedding_function=embeddings  # 🔥 THIS FIXES THE BUG
    )

    docs = vectordb.similarity_search(question, k=4)
    context = "\n\n".join([d.page_content for d in docs])

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    prompt = f"""
Answer the question using ONLY the context below.

Context:
{context}

Question:
{question}
"""

    response = llm.invoke(prompt)
    return response.content
