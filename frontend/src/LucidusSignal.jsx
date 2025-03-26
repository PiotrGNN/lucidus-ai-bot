import React, { useState } from 'react';

export default function LucidusSignal() {
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSignal = async () => {
    setLoading(true);
    setError(null);
    setDecision(null);
    try {
      const response = await fetch('https://lucidus-backend.onrender.com/predict'); // <- zmień jeśli lokalnie
      if (!response.ok) {
        throw new Error('Błąd pobierania predykcji');
      }
      const data = await response.json();
      setDecision(data?.decision || 'Brak odpowiedzi');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button onClick={getSignal} style={{
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#222',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        🔍 Sprawdź sygnał
      </button>

      {loading && <p>⏳ Czekaj, analizuję rynek...</p>}
      {decision && <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>🧠 Decyzja AI: <strong>{decision}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}