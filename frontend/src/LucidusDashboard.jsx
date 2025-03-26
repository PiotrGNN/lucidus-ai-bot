import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function LucidusDashboard() {
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("live");
  const [log, setLog] = useState([]);
  const [balance, setBalance] = useState(10.00);
  const [history, setHistory] = useState([]);

  const fallbackDecision = () => {
    const options = ["Kupuj", "Sprzedaj", "Czekaj"];
    return options[Math.floor(Math.random() * options.length)];
  };

  const fakeAIReason = (decision) => {
    switch (decision) {
      case "Kupuj": return "🟢 Trend wzrostowy na RSI i MACD";
      case "Sprzedaj": return "🔴 Sygnał odwrócenia na wykresie świecowym";
      default: return "🟡 Brak silnego sygnału – obserwacja rynku";
    }
  };

  const simulateProfit = (decision) => {
    const delta = {
      "Kupuj": Math.random() * 0.4,
      "Sprzedaj": Math.random() * 0.4,
      "Czekaj": 0
    };
    const sign = decision === "Kupuj" ? 1 : decision === "Sprzedaj" ? -1 : 0;
    return +(balance + sign * delta[decision]).toFixed(2);
  };

  const getSignal = async () => {
    setError(null);
    setMode("live");
    try {
      const response = await fetch('https://lucidus-backend.onrender.com/predict');
      if (!response.ok) throw new Error("Brak odpowiedzi");
      const data = await response.json();
      updateDashboard(data?.decision || fallbackDecision());
    } catch (err) {
      setMode("offline");
      const simulated = fallbackDecision();
      setError("Backend offline – tryb symulowany");
      updateDashboard(simulated);
    }
  };

  const updateDashboard = (newDecision) => {
    setDecision(newDecision);
    const explanation = fakeAIReason(newDecision);
    const updatedBalance = simulateProfit(newDecision);
    setBalance(updatedBalance);
    setLog((prev) => [`${newDecision}: ${explanation}`, ...prev.slice(0, 4)]);
    setHistory((prev) => [...prev.slice(-9), updatedBalance]);
  };

  useEffect(() => {
    getSignal(); // Run once on mount
    const interval = setInterval(getSignal, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🚀 Lucidus Dashboard</h1>
      <p>Twoja AI do tradingu właśnie wystartowała.</p>

      <div style={{ margin: '1rem' }}>
        <button onClick={getSignal} style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#111',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          🔍 Sprawdź sygnał
        </button>
      </div>

      {decision && (
        <p style={{ fontSize: '1.5rem' }}>
          🧠 Decyzja AI: <strong>{decision}</strong><br />
          <span style={{ fontSize: '0.9rem', color: mode === "offline" ? "orange" : "green" }}>
            ({mode === "offline" ? "tryb offline" : "na żywo"})
          </span>
        </p>
      )}

      <p style={{ color: 'orange' }}>{error}</p>

      <h3 style={{ marginTop: '2rem' }}>💰 Symulowane saldo: <span style={{ color: '#00c77b' }}>${balance}</span></h3>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Line
          data={{
            labels: history.map((_, idx) => `#${idx + 1}`),
            datasets: [
              {
                label: "Wartość portfela ($)",
                data: history,
                fill: false,
                borderColor: "#007bff",
              }
            ]
          }}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h4>🧾 Logi AI (ostatnie decyzje)</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {log.map((entry, idx) => (
            <li key={idx} style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>– {entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}