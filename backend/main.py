from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

import schemas
import models

from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session 

Base.metadata.create_all(engine)

#we have to create a separate session for each request so this function will be called for every request
def get_session():
    session = SessionLocal()
    try:
        yield session  #yield is like return but we can write multiple yields in a function
    finally:
        session.close()

app = FastAPI()


origins = {
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)


@app.get("/")
def getItems(session: Session = Depends(get_session)):   #get_session function is our dependency to store and close the session
    items = session.query(models.Item).all()
    return items

@app.post("/")
def addItem(item:schemas.Item, session: Session = Depends(get_session)):
    item = models.Item(name = item.name, email = item.email)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@app.put("/{id}")
def updateItem(id:int, item:schemas.Item, session: Session = Depends(get_session)):
    itemObject = session.query(models.Item).get(id)
    itemObject.name = item.name
    itemObject.email = item.email
    session.commit()
    return itemObject

@app.delete("/{id}")
def deleteItem(id:int, session: Session = Depends(get_session)):
    itemObject = session.query(models.Item).get(id)
    session.delete(itemObject)
    session.commit()
    session.close()
    return {'Item was deleted...'}
