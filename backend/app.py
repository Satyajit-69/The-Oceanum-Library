from fastapi import FastAPI
from routes.chat import router as chat_router
from routes import upload

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Oceanum backend running"}

app.include_router(chat_router, prefix="/api")
app.include_router(upload.router,prefix="/api")