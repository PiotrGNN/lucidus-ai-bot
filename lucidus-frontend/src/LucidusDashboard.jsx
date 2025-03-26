import React, { useEffect, useState } from "react";
import axios from "axios";

function LucidusDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://lucidus-ai-bot-3.onrender.com/predict")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default LucidusDashboard;