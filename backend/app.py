from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.voice_agent.voice_agent import router  as voice_router
from routes.rag.upload import router as upload_router
from routes.rag.chat import router as chat_router

app = FastAPI()

# ✅ CORS (for frontend localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ✅ Routers
app.include_router(upload_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(voice_router,prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Oceanum Library API is running"}