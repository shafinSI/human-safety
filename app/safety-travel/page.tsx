"use client";

import { useState } from "react";

export default function SafetyTravel() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [checked, setChecked] = useState(false);

  const checkSafety = () => {
    if (!from.trim() || !to.trim()) {
      alert("Please enter From and To location");
      return;
    }

    setChecked(true);
  };

  return (
    <main className="travelPage">
      <section className="travelBox">
        <p className="travelBadge">🛣️ Safe Route Checker</p>

        <h1>Safety Travel</h1>

        <p className="travelDesc">
          Check your travel route before starting your journey.
        </p>

        <div className="travelForm">
          <input
            type="text"
            placeholder="From location"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setChecked(false);
            }}
          />

          <input
            type="text"
            placeholder="To location"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setChecked(false);
            }}
          />

          <button onClick={checkSafety}>Check Safety</button>
        </div>

        {checked && (
          <div className="travelResult">
            <h2>Route Safety Checked ✅</h2>
            <p>
              From <b>{from}</b> to <b>{to}</b> route is ready to review.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}