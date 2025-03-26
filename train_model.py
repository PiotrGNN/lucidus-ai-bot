import os
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

model_path = "model.pkl"

# Automatyczne trenowanie jeśli model nie istnieje
if not os.path.exists(model_path):
    print("🔄 Model nie znaleziony – rozpoczynam trening...")
    df = pd.read_csv("btc_usd_data.csv")
    X = df[["price", "volume", "momentum"]]
    y = df["label"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = DecisionTreeClassifier(random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"📊 Dokładność na zbiorze testowym: {acc:.2f}")
    print("📊 Raport klasyfikacji:\n", classification_report(y_test, y_pred))
    joblib.dump(model, model_path)
    print("✅ Model został zapisany jako 'model.pkl'")
else:
    print("✅ Model już istnieje – pomijam trening.")