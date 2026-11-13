from sqlalchemy import (BigInteger,String,TIMESTAMP,text,ForeignKey)
from sqlalchemy.orm import Mapped, mapped_column
from database import Base
from datetime import datetime


class AuthAccount(Base):

    __tablename__ = "auth_accounts"

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True
    )

    # Cascade deletion of associated accounts
    user_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    provider: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    provider_user_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    password_hash: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP"),
        nullable=False
    )
