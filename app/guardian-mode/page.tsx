"use client";

import { useState } from "react";

export default function GuardianMode() {
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="guardianPage">
      <section className="guardianBox">
        <p className="guardianBadge">🛡️ Travel Protection</p>

        <h1>Travel Guardian Mode</h1>

        <p className="guardianDesc">
          Share your travel location with trusted contacts.
        </p>

        <button
          className={isOn ? "guardianBtn stopBtn" : "guardianBtn startBtn"}
          onClick={() => setIsOn(!isOn)}
        >
          {isOn ? "Stop Guardian Mode" : "Start Guardian Mode"}
        </button>

        <h2 className={isOn ? "statusOn" : "statusOff"}>
          Guardian Mode {isOn ? "ON" : "OFF"}
        </h2>
      </section>
    </main>
  );
}