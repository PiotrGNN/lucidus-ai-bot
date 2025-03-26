import yfinance as yf
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# 1. Pobranie danych historycznych BTC/USD z Yahoo Finance
btc_data = yf.download('BTC-USD', start='2020-01-01', end='2025-01-01', interval='1d')

# 2. Inżynieria cech
btc_data['Price Change'] = btc_data['Close'].pct_change()
btc_data['Volume Change'] = btc_data['Volume'].pct_change()
btc_data['Momentum'] = btc_data['Close'] - btc_data['Close'].shift(5)
btc_data['Label'] = (btc_data['Price Change'].shift(-1) > 0).astype(int)  # 1 = kupno, 0 = sprzedaż

btc_data.dropna(inplace=True)

# 3. Dane wejściowe i etykiety
features = ['Price Change', 'Volume Change', 'Momentum']
X = btc_data[features]
y = btc_data['Label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Trening modelu
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# 5. Ewaluacja
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'📊 Dokładność na zbiorze testowym: {accuracy:.2f}')

# 6. Eksport modelu
joblib.dump(model, 'model.pkl')
print("✅ Model zapisany jako 'model.pkl'")
