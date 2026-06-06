"use client";

import Sidebar from "../components/sidebar";
import Link from "next/link";
import { useState } from "react";

export default function GuardianMode() {
  const [guardianOn, setGuardianOn] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [location, setLocation] = useState(null);
  const [trustedName, setTrustedName] = useState("");
  const [trustedPhone, setTrustedPhone] = useState("");
  const startGuardianMode = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported in this browser");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const liveLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        console.log("Live Location:", liveLocation);
        setLocation(liveLocation);
        setGuardianOn(true);
      },
      (err) => {
        console.log("Location Error:", err);
        alert("Location error: " + err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    setWatchId(id);
  };

  const stopGuardianMode = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    setGuardianOn(false);
    setWatchId(null);
    setLocation(null);
  };

  const mapLink = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
    : "";

  const shareMessage = location
    ? `Guardian Mode ON. My live location: ${mapLink}`
    : "";

  return (
    <main className="guardianPage">
      <Sidebar />

      <nav className="guardianNavbar">
        <Link href="/" className="guardianLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="guardianLinks">
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
            onClick={guardianOn ? stopGuardianMode : startGuardianMode}
          >
            🛡️ {guardianOn ? "Stop Guardian Mode" : "Start Guardian Mode"}
          </button>

          <div className="guardianToggle">
            <div className={guardianOn ? "toggleSwitch on" : "toggleSwitch"} />
            Guardian Mode {guardianOn ? "ON" : "OFF"}
          </div>
          <div className="trustedContactBox">
  <h3>👥 Trusted Contact</h3>

  <input
    type="text"
    placeholder="Contact Name"
    value={trustedName}
    onChange={(e) => setTrustedName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Phone Number"
    value={trustedPhone}
    onChange={(e) => setTrustedPhone(e.target.value)}
  />
</div>

          {location && (
            <div className="guardianLocationBox">
              <p>Latitude: {location.lat}</p>
              <p>Longitude: {location.lng}</p>

              <div className="guardianShareBtns">
                <a href={mapLink} target="_blank">
                  🗺️ Google Maps
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    shareMessage
                  )}`}
                  target="_blank"
                >
                  🟢 WhatsApp
                </a>

              <a
  href={`sms:${trustedPhone}?body=${encodeURIComponent(shareMessage)}`}
>
  💬 SMS to {trustedName || "Contact"}
</a>
              </div>
            </div>
          )}
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