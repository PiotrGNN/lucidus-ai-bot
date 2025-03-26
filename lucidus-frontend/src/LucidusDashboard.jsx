import React, { useEffect, useState } from "react";
import axios from "axios";

function LucidusDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://lucidus-ai-bot-3.onrender.com/predict")
      .then(res => setData(res.data))
      .catch(err => setData({ error: err.message }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default LucidusDashboard;