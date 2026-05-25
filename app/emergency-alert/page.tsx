"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function EmergencyAlert() {
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [countdown, setCountdown] = useState(5);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function startAlert() {
    const saved = localStorage.getItem("emergencyContacts");

    if (!saved) {
      setStatus("❌ No contacts found. Add contacts first.");
      return;
    }

    setStatus("⏳ Preparing to send alert...");
    setIsTracking(true);
    setCountdown(5);

    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          sendLiveLocation();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  function sendLiveLocation() {
    const contacts = JSON.parse(
      localStorage.getItem("emergencyContacts") || "[]"
    );

    if (!navigator.geolocation) {
      setStatus("❌ Geolocation not supported.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const link = `https://www.google.com/maps?q=${lat},${lng}`;

        setMapLink(link);

        setStatus(
          `🚨 Alert sent to: ${contacts.join(
            ", "
          )} | 🔴 Live tracking ON`
        );
      },
      () => {
        setStatus("❌ Location permission denied.");
      },
      { enableHighAccuracy: true }
    );
  }

  function stopAlert() {
    setIsTracking(false);
    setStatus("🟢 Alert stopped");

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <main className="alertPage">

      <header className="alertTop">
        <Link href="/" className="alertBrand">
          <img src="/logo.png" alt="logo" />
          Human Safety Home
        </Link>

        <p>🛡️ Your Safety, Our Priority</p>
      </header>

      <section className="alertCard">

        <div className="alertIcon">🔔</div>

        <h1>Emergency Alert</h1>

        <p className="alertText">
          If you are in danger, press the button below.
          Your alert will be sent immediately to your emergency contacts.
        </p>

        {!isTracking ? (
          <button onClick={startAlert} className="sendAlertBtn">
            ⚠️ SEND ALERT
          </button>
        ) : (
          <button onClick={stopAlert} className="stopAlertBtn">
            🟢 STOP ALERT
          </button>
        )}

        {countdown > 0 && isTracking && (
          <p className="countdown">
            Sending in: <b>{countdown}s</b>
          </p>
        )}

        <p className="locationNote">
          🛡️ Your location will be shared for faster help.
        </p>

        <div className="divider">
          <span></span>
          <b>How it works</b>
          <span></span>
        </div>

        <div className="alertSteps">

          <div>
            <strong>📍 Share Location</strong>
            <p>Your live location will be shared instantly.</p>
          </div>

          <div>
            <strong>📞 Notify Contacts</strong>
            <p>Your emergency contacts will be notified.</p>
          </div>

          <div>
            <strong>⚡ Get Help Fast</strong>
            <p>Quick response from nearby helpers.</p>
          </div>

        </div>

        {status && (
          <p className="alertStatus">{status}</p>
        )}

        {mapLink && (
          <a
            href={mapLink}
            target="_blank"
            className="mapBtn"
          >
            📍 View Live Location
          </a>
        )}

        <p className="alertWarning">
          ⓘ Use this only in genuine emergencies.
        </p>

      </section>

      <p className="secureText">
        🔒 Your data is secure and encrypted
      </p>

    </main>
  );
}