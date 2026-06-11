"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Route = {
  id: number;
  startPoint: string;
  destination: string;
  score: number;
  riskLevel: string;
  mapLink: string;
  createdAt: string;
};

export default function RouteHistory() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch("/api/safety-route")
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  return (
    <main style={mainStyle}>
      <Link href="/dashboard" style={backStyle}>
        ← Back Dashboard
      </Link>

      <h1 style={titleStyle}>🛣️ Route History</h1>
      <p style={subTitleStyle}>Your analyzed travel routes are listed here.</p>

      {routes.length === 0 ? (
        <div style={emptyStyle}>No route history found.</div>
      ) : (
        <div style={gridStyle}>
          {routes.map((route) => (
            <div key={route.id} style={cardStyle}>
              <h2 style={cardTitleStyle}>Route #{route.id}</h2>

              <p style={textStyle}>
                <b>From:</b> {route.startPoint}
              </p>
              <p style={textStyle}>
                <b>To:</b> {route.destination}
              </p>
              <p style={textStyle}>
                <b>Score:</b> {route.score}%
              </p>
              <p style={textStyle}>
                <b>Risk:</b> {route.riskLevel}
              </p>

              <a href={route.mapLink} target="_blank" style={mapBtnStyle}>
                🗺️ Open Route
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "45px",
  background: "linear-gradient(135deg, #020617, #071426, #0f172a)",
  color: "white",
};

const backStyle: React.CSSProperties = {
  color: "#22d3ee",
  textDecoration: "none",
  fontWeight: "bold",
};

const titleStyle: React.CSSProperties = {
  marginTop: "30px",
  fontSize: "42px",
  color: "#22d3ee",
};

const subTitleStyle: React.CSSProperties = {
  color: "#cbd5e1",
  marginBottom: "30px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const cardStyle: React.CSSProperties = {
  padding: "24px",
  borderRadius: "18px",
  background: "rgba(15, 23, 42, 0.92)",
  border: "1px solid rgba(34, 211, 238, 0.25)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
};

const cardTitleStyle: React.CSSProperties = {
  color: "#10f5a0",
  marginBottom: "15px",
};

const textStyle: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: "16px",
  margin: "10px 0",
};

const mapBtnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "14px",
  padding: "11px 16px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #06b6d4, #10b981)",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const emptyStyle: React.CSSProperties = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "14px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
  color: "white",
};