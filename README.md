
# LUCIDUS – AI Trading Assistant (Cloud Deploy Ready)

## 🔧 Backend (FastAPI)
1. `cd backend_fastapi`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload`

Endpoint: POST `/predict`
Payload:
{
  "volatility": 3.2,
  "volume": 412.5,
  "sentiment": 0.7
}

## 🌐 Frontend (React)
Deploy `/frontend` folder on Vercel or run locally.

---

For cloud hosting, deploy `backend_fastapi` on Render (Python/FastAPI environment).
