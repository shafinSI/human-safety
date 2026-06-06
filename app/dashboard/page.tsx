"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dashboard API Response:", data);

        if (data.stats) {
          setStats(data.stats);
        }
      })
      .catch((err) => {
        console.error("Dashboard Error:", err);
      });
  }, []);

  if (!stats) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "40px",
          color: "white",
          background: "#050b1a",
        }}
      >
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#050b1a",
        color: "white",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#00f5ff",
          textDecoration: "none",
        }}
      >
        ← Back Home
      </Link>

      <h1
        style={{
          marginTop: "30px",
          color: "#00f5ff",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "30px",
          maxWidth: "900px",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.contacts}</h2>
          <p>Emergency Contacts</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.guardians}</h2>
          <p>Guardians</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.alerts}</h2>
          <p>Emergency Alerts</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.travels}</h2>
          <p>Safety Travels</p>
        </div>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  padding: "25px",
  borderRadius: "14px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
};