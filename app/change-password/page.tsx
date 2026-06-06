"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("/api/auth/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password changed successfully");
      window.location.href = "/login";
    } else {
      alert(data.error || "Password change failed");
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: "40px", background: "#050b1a", color: "white" }}>
      <Link href="/" style={{ color: "#00f5ff", textDecoration: "none" }}>
        ← Back Home
      </Link>

      <div style={{ maxWidth: "450px", marginTop: "40px", padding: "30px", background: "#0b1224", borderRadius: "14px" }}>
        <h1 style={{ color: "#00f5ff" }}>Change Password</h1>

        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Change Password
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #1f2a44",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};