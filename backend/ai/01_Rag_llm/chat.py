import os
from dotenv import load_dotenv
load_dotenv()

from google import genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient

# -----------------------------
# GEMINI SETUP
# -----------------------------
client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model_name = "gemini-2.5-flash"

# -----------------------------
# QDRANT + EMBEDDINGS
# -----------------------------
embedder = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001"   # ✅ correct param
)

client_q = QdrantClient(url="http://localhost:6333")

vector_store = QdrantVectorStore(
    client=client_q,
    collection_name="notes_2",
    embedding=embedder
)

# -----------------------------
# RAG FUNCTION
# -----------------------------
def ask_question(query, k=3):
    results = vector_store.similarity_search(query, k=k)

    if not results:
        return "No matching syllabus content found."

    context = "\n".join(doc.page_content for doc in results)

    prompt = f"""
Use ONLY the below syllabus context to answer the question.
If the answer is not found, say: "Not available in syllabus."

Context:
{context}

Question: {query}

Answer:
"""

    response = client.models.generate_content(
        model=model_name,
        contents=prompt
    )

    return response.text

# -----------------------------
# CHAT LOOP
# -----------------------------
print("📘 Syllabus Chatbot Ready!")
print("Ask anything about your syllabus. Type 'exit' to quit.\n")

while True:
    q = input("You: ").strip()

    if q.lower() in ["exit", "quit", "bye"]:
        print("Bot: Goodbye! 👋")
        break

    print("\nBot:\n" + ask_question(q) + "\n" + "-"*60 + "\n")
