import React, { useState } from 'react';

export default function LucidusSignal() {
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("live");

  const fallbackDecision = () => {
    const options = ["Kupuj", "Sprzedaj", "Czekaj"];
    return options[Math.floor(Math.random() * options.length)];
  };

  const getSignal = async () => {
    setLoading(true);
    setError(null);
    setDecision(null);
    setMode("live");

    try {
      const response = await fetch('https://lucidus-backend.onrender.com/predict', { timeout: 3000 });
      if (!response.ok) throw new Error("Brak odpowiedzi");
      const data = await response.json();
      setDecision(data?.decision || 'Brak odpowiedzi');
    } catch (err) {
      setMode("offline");
      setError("Backend offline – tryb symulowany");
      setDecision(fallbackDecision());
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
      {decision && (
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          🧠 Decyzja AI: <strong>{decision}</strong><br />
          <span style={{ fontSize: '0.9rem', color: mode === "offline" ? "orange" : "green" }}>
            ({mode === "offline" ? "tryb offline" : "na żywo"})
          </span>
        </p>
      )}
      {error && <p style={{ color: 'orange' }}>{error}</p>}
    </div>
  );
}