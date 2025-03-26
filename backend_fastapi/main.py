
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
# backend_fastapi/main.py

import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(model_path)

app = FastAPI()
model = joblib.load("model.pkl")

class MarketFeatures(BaseModel):
    volatility: float
    volume: float
    sentiment: float

@app.post("/predict")
def predict_decision(features: MarketFeatures):
    X = np.array([[features.volatility, features.volume, features.sentiment]])
    prediction = model.predict(X)[0]
    decision = "BUY" if prediction == 1 else "SELL"
    return {"decision": decision}
