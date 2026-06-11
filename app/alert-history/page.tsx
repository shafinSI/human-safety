"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Alert = {
  id: number;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
  mapLink: string;
  createdAt: string;
};

export default function AlertHistory() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetch("/api/guardian-alert")
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  }, []);

  const deleteAlert = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this alert?");

    if (!confirmDelete) return;

    await fetch(`/api/guardian-alert/${id}`, {
      method: "DELETE",
    });

    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <main style={mainStyle}>
      <Link href="/dashboard" style={backStyle}>
        ← Back Dashboard
      </Link>

      <h1 style={titleStyle}>🚨 Alert History</h1>
      <p style={subTitleStyle}>All Guardian SOS alerts are listed here.</p>

      {alerts.length === 0 ? (
        <div style={emptyStyle}>No alerts found.</div>
      ) : (
        <div style={gridStyle}>
          {alerts.map((alert) => (
            <div key={alert.id} style={cardStyle}>
              <h2 style={cardTitleStyle}>SOS Alert #{alert.id}</h2>

              <p>
                <b>Name:</b> {alert.name}
              </p>
              <p>
                <b>Phone:</b> {alert.phone}
              </p>
              <p>
                <b>Latitude:</b> {alert.latitude}
              </p>
              <p>
                <b>Longitude:</b> {alert.longitude}
              </p>
              <p>
                <b>Time:</b>{" "}
                {alert.createdAt
                  ? new Date(alert.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <a href={alert.mapLink} target="_blank" style={mapBtnStyle}>
                🗺️ Open Google Maps
              </a>

              <button
                style={deleteBtnStyle}
                onClick={() => deleteAlert(alert.id)}
              >
                🗑️ Delete Alert
              </button>
            </div>
          ))}
        </div>
      )}
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
  fontWeight: "bold",
};

const titleStyle: React.CSSProperties = {
  marginTop: "30px",
  color: "#ff4d4d",
};

const subTitleStyle: React.CSSProperties = {
  color: "#9ca3af",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const cardStyle: React.CSSProperties = {
  padding: "22px",
  borderRadius: "16px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
};

const cardTitleStyle: React.CSSProperties = {
  color: "#ff4d4d",
  marginBottom: "15px",
};

const mapBtnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "12px",
  padding: "10px 14px",
  borderRadius: "10px",
  background: "#00f5ff",
  color: "#050b1a",
  textDecoration: "none",
  fontWeight: "bold",
};

const deleteBtnStyle: React.CSSProperties = {
  display: "block",
  marginTop: "12px",
  padding: "10px 14px",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const emptyStyle: React.CSSProperties = {
  marginTop: "30px",
  padding: "25px",
  borderRadius: "14px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
};