"use client";

import { useState } from "react";

export default function NearestPeople() {
  const [notified, setNotified] = useState(false);

  return (
    <main className="nearestPage">
      <section className="nearestBox">
        <p className="nearestBadge">📍 Nearby Safety Alert</p>

        <h1>Nearest People Notification</h1>

        <p className="nearestDesc">
          Notify nearby trusted people in case of danger.
        </p>

        <button
          className={notified ? "nearestBtn notifiedBtn" : "nearestBtn notifyBtn"}
          onClick={() => setNotified(!notified)}
        >
          {notified ? "Notification Sent" : "Notify Nearby People"}
        </button>

        <h2 className={notified ? "nearestStatusOn" : "nearestStatusOff"}>
          {notified ? "Nearby People Notified ✅" : "Waiting for notification"}
        </h2>
      </section>
    </main>
  );
}