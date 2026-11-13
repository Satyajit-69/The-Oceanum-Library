from sqlalchemy import (BigInteger,String,TIMESTAMP,text) 
from sqlalchemy.orm  import Mapped ,mapped_column 
from database import Base 
from datetime import datetime
from sqlalchemy import func

class User(Base) :
    # users -> ORM -> users table 
    __tablename__ = 'users' 

    id:Mapped[int] = mapped_column (
        BigInteger , 
        primary_key = True ,
        autoincrement = True 
    )



    name : Mapped[str] = mapped_column(
        String(225),
        nullable = False
    )



    email : Mapped[str] = mapped_column(
        String(225),
        unique = True ,
        nullable = False 
    )


    avatar_url : Mapped[str | None] = mapped_column(
        String(500) ,
        nullable = True 
    )

    status : Mapped[str] = mapped_column(
        String(20) ,
        server_default = text("'active'")
    )


    created_at  : Mapped[datetime] = mapped_column(
        TIMESTAMP ,
        server_default = text("CURRENT_TIMESTAMP")
    )

    updated_at : Mapped[datetime] = mapped_column(
        TIMESTAMP ,
        server_default = text ("CURRENT_TIMESTAMP"),
        onupdate = func.current_timestamp()
    )




from .auth_account import AuthAccount