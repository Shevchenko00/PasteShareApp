from pydantic import BaseModel, EmailStr

class PasteCreateScheme(BaseModel):
    title: str
    text: str