"use client";

import Link from "next/link";
import { useState } from "react";

export default function GuardianMode() {
  const [guardianOn, setGuardianOn] = useState(false);

  return (
    <main className="guardianPage">
      <nav className="guardianNavbar">
        <Link href="/" className="guardianLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="guardianLinks">
          <Link href="/">Dashboard</Link>
          <Link href="/emergency-alert">Alerts</Link>
          <Link href="/guardian-mode" className="guardianActive">
            Guardian Mode
          </Link>
        </div>

        <div className="guardianUser">U</div>
      </nav>

      <section className="guardianHero">
        <div className="guardianLeft">
          <div className="guardianBadge">🛡️ Travel Protection</div>

          <h1>
            Travel <span>Guardian Mode</span>
          </h1>

          <p>
            Share your live location and travel route with your trusted contacts.
            Stay safe, they stay informed.
          </p>

          <button
            className="guardianBtn"
            onClick={() => setGuardianOn(!guardianOn)}
          >
            🛡️ {guardianOn ? "Stop Guardian Mode" : "Start Guardian Mode"}
          </button>

          <div className="guardianToggle">
            <div className={guardianOn ? "toggleSwitch on" : "toggleSwitch"} />
            Guardian Mode {guardianOn ? "ON" : "OFF"}
          </div>
        </div>

        <div className="guardianRight">
          <img
            src="/safety_travel.png"
            alt="guardian"
            className="guardianImage"
          />

          <div className="guardianFloating">
            <h3>📍 Live Location Sharing</h3>
            <p>Your location is shared securely with trusted contacts.</p>
          </div>
        </div>
      </section>

      <div className="guardianDivider">
        <span></span>
        <h2>How It Works</h2>
        <span></span>
      </div>

      <section className="guardianSteps">
        <div className="guardianStepCard">
          <h3>📍 Share Your Route</h3>
          <p>Start Guardian Mode and share your live location.</p>
        </div>

        <div className="guardianStepCard">
          <h3>👥 Trusted Contacts</h3>
          <p>Your trusted contacts will get live updates.</p>
        </div>

        <div className="guardianStepCard">
          <h3>🛡️ Stay Protected</h3>
          <p>They can monitor your journey and help if needed.</p>
        </div>
      </section>

      <div className="guardianBottom">
        🔒 Your data is end-to-end encrypted and only shared with trusted
        contacts.
      </div>
    </main>
  );
}