from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from services.predictor import predict
from utils.image_loader import load_image

app = FastAPI(title="Calorie AI Service", version="0.1.0")


@app.get("/", tags=["health"])
async def root():
  return {"service": "ai-model", "status": "ok"}


@app.post("/predict", tags=["prediction"])
async def predict_route(image: UploadFile = File(...)):
  if not image.content_type or not image.content_type.startswith("image/"):
    raise HTTPException(status_code=400, detail="Only image uploads are supported")

  pil_image = await load_image(image)
  result = predict(pil_image)
  return JSONResponse(content=result)
