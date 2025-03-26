
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";

const LucidusDashboard = () => {
  const [portfolio, setPortfolio] = useState(10.0);
  const [log, setLog] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    const mockLog = [
      { timestamp: "09:00", decision: "BUY", source: "AI + Logic", price: 2460.2 },
      { timestamp: "09:15", decision: "SELL", source: "Logic", price: 2473.6 },
    ];
    const mockSentiment = [0.1, 0.4, 0.6, 0.3, 0.7, 0.2];

    setLog(mockLog);
    setSentimentData(mockSentiment);
  }, []);

  const sentimentChart = {
    labels: sentimentData.map((_, i) => `t-${i}`),
    datasets: [
      {
        label: "Sentiment",
        data: sentimentData,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-white shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Lucidus Portfolio</h2>
          <p>Current Value: ${portfolio.toFixed(2)} USD</p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Sentiment Trend</h2>
          <Line data={sentimentChart} />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Decision Log</h2>
          <ul className="space-y-2">
            {log.map((entry, i) => (
              <li key={i} className="border-b pb-2">
                <strong>{entry.timestamp}</strong> — {entry.decision} @ ${entry.price} <em>({entry.source})</em>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LucidusDashboard;
