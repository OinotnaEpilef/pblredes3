from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from config import DATABASE_URI

Base = declarative_base()
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String, nullable=False)
    side_a = Column(String, nullable=False)
    side_b = Column(String, nullable=False)
    odds_a = Column(Float, nullable=False)
    odds_b = Column(Float, nullable=False)
    status = Column(Boolean, default=True)
    result = Column(String, nullable=False)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    balance = Column(Float, default=100.0)

class Bet(Base):
    __tablename__ = 'bets'
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    amount = Column(Float, nullable=False)
    choice = Column(String, nullable=False)

    event = relationship("Event", backref="bets")
    user = relationship("User", backref="bets")

    def __repr__(self):
        return f"<Bet(id={self.id}, event_id={self.event_id}, user_id={self.user_id}, amount={self.amount}, choice={self.choice})>"


Base.metadata.create_all(engine)