"use client";

import { useState } from "react";

export default function EmergencyAlert() {
  const [sent, setSent] = useState(false);

  return (
    <main className="emergencyPage">
      <section className="emergencyBox">
        <p className="emergencyBadge">🚨 Immediate Danger Alert</p>

        <h1>Emergency Alert</h1>

        <p className="emergencyDesc">
          If you are in danger, press the button immediately.
        </p>

        <button
          className={sent ? "emergencyBtn sentBtn" : "emergencyBtn alertBtn"}
          onClick={() => setSent(!sent)}
        >
          {sent ? "Alert Sent ✅" : "SEND ALERT"}
        </button>

        <h2 className={sent ? "emergencyOn" : "emergencyOff"}>
          {sent ? "Emergency Alert Sent!" : "Waiting to send alert"}
        </h2>
      </section>
    </main>
  );
}