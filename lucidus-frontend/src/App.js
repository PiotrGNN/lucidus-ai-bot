import React from "react";
import LucidusDashboard from "./LucidusDashboard";
import LucidusSignal from "./LucidusSignal";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Lucidus AI Bot</h1>
      <LucidusDashboard />
      <LucidusSignal />
    </div>
  );
}

export default App;