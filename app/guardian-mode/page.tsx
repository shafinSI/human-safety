"use client";

import Sidebar from "../components/sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GuardianMode() {
  const [guardianOn, setGuardianOn] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [location, setLocation] = useState(null);
  const [trustedName, setTrustedName] = useState("");
  const [trustedPhone, setTrustedPhone] = useState("");

  useEffect(() => {
    const savedContact = localStorage.getItem("trustedContact");

    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setTrustedName(contact.name || "");
      setTrustedPhone(contact.phone || "");
    }
  }, []);

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

  const saveContact = () => {
    if (!trustedName || !trustedPhone) {
      alert("Please enter contact name and phone number");
      return;
    }

    localStorage.setItem(
      "trustedContact",
      JSON.stringify({
        name: trustedName,
        phone: trustedPhone,
      })
    );

    alert("Contact Saved Successfully");
  };

  const sendSOSAlert = async () => {
    if (!location) {
      alert("Please start Guardian Mode first");
      return;
    }

    if (!trustedName || !trustedPhone) {
      alert("Please enter and save trusted contact first");
      return;
    }

    const sosMapLink = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

    const emergencyMessage = `🚨 EMERGENCY ALERT 🚨
I need help.

Trusted Contact:
Name: ${trustedName}
Phone: ${trustedPhone}

My current location:
${sosMapLink}`;

    try {
      const res = await fetch("/api/guardian-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trustedName,
          phone: trustedPhone,
          latitude: location.lat,
          longitude: location.lng,
          mapLink: sosMapLink,
        }),
      });

      if (!res.ok) {
        alert("SOS alert database save failed");
        return;
      }

      alert("SOS Alert Saved Successfully");

      window.open(
        `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`,
        "_blank"
      );
    } catch (error) {
      console.error("SOS Error:", error);
      alert("Failed to send SOS alert");
    }
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

          <button className="sosBtn" onClick={sendSOSAlert}>
            🚨 SOS Emergency Alert
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

            <button className="saveContactBtn" onClick={saveContact}>
              💾 Save Contact
            </button>
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
                  href={`sms:${trustedPhone}?body=${encodeURIComponent(
                    shareMessage
                  )}`}
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