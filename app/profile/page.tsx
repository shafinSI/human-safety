"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Mail, Calendar, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || data);
      })
      .catch((err) => console.error("Profile Error:", err));
  }, []);

  if (!user) {
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

      <h1 style={titleStyle}>Profile</h1>
      <p style={subtitleStyle}>Your personal safety account information</p>

      <div style={profileCardStyle}>
        <div style={avatarStyle}>
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2>{user?.name}</h2>
        <p style={emailTextStyle}>{user?.email}</p>

        <div style={infoBoxStyle}>
          <div style={infoRowStyle}>
            <BadgeCheck color="#00f5ff" />
            <span><b>ID:</b> {user?.id}</span>
          </div>

          <div style={infoRowStyle}>
            <User color="#00f5ff" />
            <span><b>Name:</b> {user?.name}</span>
          </div>

          <div style={infoRowStyle}>
            <Mail color="#00f5ff" />
            <span><b>Email:</b> {user?.email}</span>
          </div>

          <div style={infoRowStyle}>
            <Calendar color="#00f5ff" />
            <span>
              <b>Created At:</b>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
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

const subtitleStyle: React.CSSProperties = {
  color: "#9ca3af",
};

const profileCardStyle: React.CSSProperties = {
  marginTop: "30px",
  padding: "35px",
  borderRadius: "18px",
  background: "#0b1224",
  border: "1px solid #1f2a44",
  maxWidth: "650px",
};

const avatarStyle: React.CSSProperties = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "#00f5ff",
  color: "#050b1a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "42px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const emailTextStyle: React.CSSProperties = {
  color: "#9ca3af",
  marginBottom: "30px",
};

const infoBoxStyle: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const infoRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "14px",
  borderRadius: "12px",
  background: "#050b1a",
  border: "1px solid #1f2a44",
};