from typing import Any

from PIL import Image
import numpy as np


def preprocess(image: Image.Image) -> np.ndarray:
  """Convert an image into a tensor placeholder for inference."""
  resized = image.resize((224, 224))
  array = np.asarray(resized).astype("float32") / 255.0
  return np.expand_dims(array, axis=0)


def predict(image: Image.Image) -> dict[str, Any]:
  """Stub prediction that returns a fake calorie count."""
  _ = preprocess(image)
  # TODO: replace with a real TensorFlow/PyTorch model inference call.
  return {"calories": 123, "confidence": 0.42}
