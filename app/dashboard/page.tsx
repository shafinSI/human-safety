"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, Shield, TriangleAlert, MapPinned } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
      <main style={mainStyle}>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <Link href="/" style={backStyle}>
        ← Back Home
      </Link>

      <h1 style={titleStyle}>Dashboard</h1>

      <p style={welcomeStyle}>Welcome to your Human Safety Dashboard</p>

      <div style={buttonBoxStyle}>
        <Link href="/emergency-contact" style={buttonStyle}>
          Add Contact
        </Link>

        <Link href="/guardian-mode" style={buttonStyle}>
          Add Guardian
        </Link>

        <Link href="/emergency-alert" style={buttonStyle}>
          Send Alert
        </Link>
      </div>

      <div style={gridStyle}>
        <Link href="/emergency-contact" style={linkStyle}>
          <div style={cardStyle}>
            <Phone size={32} color="#00f5ff" />
            <h2>{stats.contacts}</h2>
            <p>Emergency Contacts</p>
          </div>
        </Link>

        <Link href="/guardian-mode" style={linkStyle}>
          <div style={cardStyle}>
            <Shield size={32} color="#00f5ff" />
            <h2>{stats.guardians}</h2>
            <p>Guardians</p>
          </div>
        </Link>

        <Link href="/emergency-alert" style={linkStyle}>
          <div style={cardStyle}>
            <TriangleAlert size={32} color="#ff4d4d" />
            <h2>{stats.alerts}</h2>
            <p>Emergency Alerts</p>
          </div>
        </Link>

        <div style={cardStyle}>
          <MapPinned size={32} color="#00f5ff" />
          <h2>{stats.travels}</h2>
          <p>Safety Travels</p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Recent Activity</h2>
        <p>No recent activity yet.</p>
      </div>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px",
  background: "#050b1a",
  color: "white",
};

const backStyle: React.CSSProperties = {
  color: "#00f5ff",
  textDecoration: "none",
};

const titleStyle: React.CSSProperties = {
  marginTop: "30px",
  color: "#00f5ff",
};

const welcomeStyle: React.CSSProperties = {
  color: "#9ca3af",
  marginTop: "10px",
  marginBottom: "20px",
};

const buttonBoxStyle: React.CSSProperties = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const buttonStyle: React.CSSProperties = {
  background: "#00f5ff",
  color: "#050b1a",
  padding: "10px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginTop: "30px",
  maxWidth: "900px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "white",
};

const cardStyle: React.CSSProperties = {
  padding: "25px",
  borderRadius: "14px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

const sectionStyle: React.CSSProperties = {
  marginTop: "35px",
  padding: "25px",
  borderRadius: "14px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
  maxWidth: "900px",
};