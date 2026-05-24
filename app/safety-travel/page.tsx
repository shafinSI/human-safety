"use client";

import { useState } from "react";

export default function SafetyTravel() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState("");

  function checkSafety() {
    if (from === "" || to === "") {
      alert("Please enter starting point and destination");
      return;
    }

    setResult(`Route from ${from} to ${to} is checking... Please stay alert and share your location with trusted contacts.`);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Safety Travel</h1>
      <p>Check your travel route before starting your journey.</p>

      <input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <br /><br />

      <button onClick={checkSafety}>Check Safety</button>

      {result && (
        <p style={{ marginTop: "20px", color: "green" }}>
          {result}
        </p>
      )}
    </main>
  );
}

