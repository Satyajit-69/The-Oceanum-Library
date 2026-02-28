import os
from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings
)
from langchain_community.vectorstores import Chroma

VECTOR_DB_DIR = "vector_db"

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def answer_from_pdf(question: str, pdf_id: str) -> str:
    vectordb = Chroma(
        persist_directory=VECTOR_DB_DIR,
        collection_name=pdf_id,
        embedding_function=embeddings
    )

    docs = vectordb.similarity_search(question, k=4)
    if not docs:
        return "I don't see relevant information in this document 🤔"

    context = "\n\n".join(d.page_content for d in docs)

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.4
    )

    prompt = f"""
You are Lexa, a friendly AI assistant.

Rules:
- Answer ONLY from the provided document context
- The Answer should be depending on the question it can increase or decrease 
- If answer not found, say so politely
- Be concise and clear

IMPORTANT: Before giving your final answer, think step-by-step:
1. What is the user really asking?
2. What relevant information is in the context?
3. How does this information answer the question?
4. Is the information complete or are there gaps?

Then provide your answer directly (no need to show your thinking process to the user).

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(prompt)
    return response.content