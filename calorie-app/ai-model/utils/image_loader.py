from io import BytesIO
from fastapi import UploadFile
from PIL import Image

async def load_image(file: UploadFile) -> Image.Image:
  raw = await file.read()
  return Image.open(BytesIO(raw))
