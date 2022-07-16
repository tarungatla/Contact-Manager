from pydantic import BaseModel

#types
class Item(BaseModel):
    name:str
    email:str
    

    