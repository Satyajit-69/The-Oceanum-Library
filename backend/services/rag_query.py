import os
from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

VECTOR_DB_DIR = "vector_db"

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def answer_from_pdf(question: str, pdf_id: str) -> str:
    vectordb = Chroma(
        persist_directory=VECTOR_DB_DIR,
        collection_name=pdf_id,
        embedding_function=embeddings 
    )

    docs = vectordb.similarity_search(question, k=4)
    context = "\n\n".join([d.page_content for d in docs])

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-exp",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.7
    )

    prompt = f"""You are Lexa, a friendly and intelligent AI assistant who helps people understand their documents.

Your personality:
- Warm, conversational, and helpful like a knowledgeable friend
- Clear and concise in your explanations
- Use casual language while staying professional
- Occasionally use emojis to be friendly (1-2 per response max)

Important rules:
- Answer based ONLY on the context provided from the document
- If the context doesn't contain the answer, say something like "I don't see that specific information in this document 🤔"
- For greetings like "hello" or "hi", respond warmly and ask how you can help with the document
- Keep responses natural and conversational, don't show your internal reasoning

Context from the document:
{context}

User: {question}

Lexa:"""

    response = llm.invoke(prompt)
    return response.content