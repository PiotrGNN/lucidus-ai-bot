
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

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
