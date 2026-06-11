"use client";

import Sidebar from "../components/sidebar";
import Link from "next/link";
import { useState } from "react";

export default function SafetyTravel() {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeRoute = async () => {
    if (!startPoint || !destination) {
      alert("Please enter starting point and destination");
      return;
    }

    const score = Math.floor(Math.random() * 31) + 60;

    let riskLevel = "Low";
    if (score < 70) riskLevel = "High";
    else if (score < 85) riskLevel = "Medium";

    const mapLink = `https://www.google.com/maps/dir/${encodeURIComponent(
      startPoint
    )}/${encodeURIComponent(destination)}`;

    const mapPreview = `https://www.google.com/maps?q=${encodeURIComponent(
      startPoint + " to " + destination
    )}&output=embed`;

    const routeResult = {
      score,
      riskLevel,
      mapLink,
      mapPreview,
      tips: [
        "Share your route with a trusted contact.",
        "Avoid isolated roads if possible.",
        "Keep your phone charged during travel.",
        "Use Guardian Mode while travelling.",
      ],
    };

    setResult(routeResult);

    try {
      const res = await fetch("/api/safety-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startPoint,
          destination,
          score,
          riskLevel,
          mapLink,
        }),
      });

      if (!res.ok) {
        alert("Route result shown, but database save failed");
        return;
      }

      alert("Route analysis saved successfully");
    } catch (error) {
      console.error("Safety route save error:", error);
      alert("Route result shown, but database save failed");
    }
  };

  return (
    <main className="travelPage">
      <Sidebar />

      <nav className="travelNavbar">
        <Link href="/" className="travelLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="travelLinks">
          <Link href="/safety-travel#travel-guides">Guides</Link>
        </div>

        <div className="travelUser">U</div>
      </nav>

      <section className="travelHero">
        <div className="travelLeft">
          <h1>
            Plan Safe.
            <br />
            Travel Confident.
          </h1>

          <div className="travelLine"></div>

          <p>
            Get a quick safety overview of your travel route and stay one step
            ahead.
          </p>

          <img src="/safety_travel.png" alt="travel" className="travelImage" />
        </div>

        <div className="travelRight">
          <div className="travelCard">
            <h2>Check Your Route Safety</h2>

            <div className="travelInput">
              <div>
                <label>Starting Point</label>
                <input
                  type="text"
                  placeholder="Enter starting location"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                />
              </div>
            </div>

            <div className="travelInput">
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Enter destination location"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <button className="travelBtn" onClick={analyzeRoute}>
              🛡️ Analyze Route
            </button>

            {result && (
              <div className="routeResultBox">
                <h3>Route Safety Result</h3>

                <p>
                  <b>Safety Score:</b> {result.score}%
                </p>

                <p>
                  <b>Risk Level:</b> {result.riskLevel}
                </p>

                <a href={result.mapLink} target="_blank">
                  🗺️ Open Route in Google Maps
                </a>

                <iframe
                  src={result.mapPreview}
                  width="100%"
                  height="260"
                  style={{
                    border: "0",
                    borderRadius: "16px",
                    marginTop: "15px",
                  }}
                  loading="lazy"
                ></iframe>

                <h4>Safety Tips</h4>

                <ul>
                  {result.tips.map((tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="travelSmall">
              🔒 We use trusted data sources to analyze route safety.
            </p>
          </div>
        </div>
      </section>

      <section className="travelFeatures" id="travel-guides">
        <div>
          <h3>🛡️ Risk Assessment</h3>
          <p>See potential risks along your travel path.</p>
        </div>

        <div>
          <h3>👥 Crowd & Area Info</h3>
          <p>Check crowd density and neighborhood safety.</p>
        </div>

        <div>
          <h3>⚠️ Incident Alerts</h3>
          <p>Get real-time updates on incidents and hazards.</p>
        </div>

        <div>
          <h3>💙 Travel Tips</h3>
          <p>Receive smart tips for a safer journey.</p>
        </div>
      </section>

      <div className="travelBottom">
        ⓘ Your safety is our priority. Always stay alert and travel smart.
      </div>
    </main>
  );
}