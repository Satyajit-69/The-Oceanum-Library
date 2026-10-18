# 🌊 Oceanum Library — AI-Powered Document Intelligence

Oceanum Library is a web-based document intelligence platform that lets users upload PDF documents and ask natural-language questions about their contents. It uses Retrieval-Augmented Generation (RAG) to retrieve relevant document context and generate answers grounded in the uploaded material.

**Live Demo:** https://the-oceanum-library.vercel.app/  
**Backend API:** https://the-oceanum-library.onrender.com/  
**Source Code:** https://github.com/Satyajit-69/The-Oceanum-Library

## ✨ Core Features

- **PDF Question Answering:** Ask natural-language questions about uploaded documents.
- **Semantic Retrieval:** Find relevant document chunks using vector embeddings.
- **Context-Grounded Generation:** Supply retrieved context to an LLM to generate relevant answers.
- **Full-Stack Architecture:** React frontend backed by a FastAPI service.
- **Cloud Deployment:** Frontend hosted on Vercel and backend hosted on Render.

## 🏗️ How It Works

1. A user uploads a PDF.
2. The backend extracts and splits its text into chunks.
3. The chunks are converted into embeddings and indexed for retrieval.
4. A user submits a question.
5. The retriever finds relevant document chunks.
6. The backend passes the question and retrieved context to the language model.
7. The generated answer is returned to the frontend.

## 🛠️ Technology Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Python, FastAPI  
**LLM Integration:** Gemini API, LangChain  
**Retrieval:** Embeddings and vector search  
**Deployment:** Vercel, Render

## 🚧 Future Improvements

- User authentication and document-level access control
- Source citations with page numbers
- Streaming responses
- Persistent chat sessions
- Automated retrieval-quality evaluation
- Automated tests, monitoring and performance benchmarks

## 👨‍💻 Author

Satyajit Sahoo  
GitHub: https://github.com/Satyajit-69
