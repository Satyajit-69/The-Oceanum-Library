📘 The Oceanum Library

The Oceanum Library is an AI-powered document intelligence platform that allows users to upload PDFs and chat with them using Retrieval-Augmented Generation (RAG). It combines semantic search with large language models to provide accurate, context-aware answers from documents.

🌐 Live Demo:
👉 https://the-oceanum-library.vercel.app/

🔗 Backend API:
👉 https://the-oceanum-library.onrender.com/

🚀 Features

📄 Upload and manage PDF documents

🤖 Chat with PDFs using RAG (Retrieval-Augmented Generation)

🔍 Semantic search using vector embeddings

⚡ Fast, real-time responses

🎨 Modern React UI with clean UX

☁️ Fully deployed (Frontend + Backend)

🧠 How It Works (RAG Pipeline)

User uploads a PDF

Document is chunked and converted into vector embeddings

Embeddings are stored in a vector database

User asks a question

Relevant chunks are retrieved using similarity search

Retrieved context + question is sent to an LLM

AI generates a grounded, context-aware answer

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Lucide Icons

Deployed on Vercel

Backend

FastAPI

Python

LangChain

Gemini API

FAISS / Vector Database

Deployed on Render

📂 Project Structure
The-Oceanum-Library
├── backend
│   ├── app.py
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── vector_db
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── index.html
│   └── vite.config.js

⚙️ Local Setup
1️⃣ Clone the repository
git clone https://github.com/Satyajit-69/The-Oceanum-Library.git
cd The-Oceanum-Library

2️⃣ Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt


Create .env file:

GEMINI_API_KEY=your_GEMINIai_api_key


Run backend:

uvicorn app:app --reload


Backend runs at:

http://localhost:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🌍 Deployment

Backend: Render

Frontend: Vercel

Environment variables handled via platform dashboards

SPA routing handled using vercel.json

📌 Use Cases

Study notes Q&A

Research paper analysis

Resume / document understanding

Legal or policy document search

AI-powered knowledge base

🧪 Future Enhancements

🔐 User authentication

📑 Source citations with page numbers

⚡ Streaming responses

🧠 Multiple vector DB support (Pinecone, Weaviate)

💾 Persistent chat sessions

👨‍💻 Author

Satyajit
📧 GitHub: https://github.com/Satyajit-69

⭐ If you like this project

Give it a ⭐ on GitHub — it really helps!
