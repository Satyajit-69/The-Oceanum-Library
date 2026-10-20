
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text,URL
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "3306")
db_user = os.getenv("DB_USER", "root")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME", "oceanum")

if db_password is None:
    raise RuntimeError("DB_PASSWORD is missing from .env")

database_url = URL.create(
    drivername="mysql+pymysql",
    username=db_user,
    password=db_password,
    host=db_host,
    port=int(db_port),
    database=db_name
)

engine = create_engine(database_url, pool_pre_ping=True)



SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


if __name__ == "__main__":
    try:
        with engine.connect() as connection:
            print("MySQL connected successfully!")
            print("Database:", connection.execute(
                text("SELECT DATABASE()")
            ).scalar())
    except Exception as e:
        print("Database connection failed!")
        print(e)
