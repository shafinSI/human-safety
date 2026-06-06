"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
        setUser(data.user);
      });
  }, []);

  if (!user) {
    return (
      <main style={{ minHeight: "100vh", padding: "40px", color: "white" }}>
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
      <Link href="/" style={{ color: "#00f5ff", textDecoration: "none" }}>
        ← Back Home
      </Link>

      <h1 style={{ marginTop: "30px", color: "#00f5ff" }}>Profile</h1>

      <div
        style={{
          marginTop: "25px",
          padding: "25px",
          border: "1px solid #1f2a44",
          borderRadius: "12px",
          maxWidth: "500px",
          background: "#0b1224",
        }}
      >
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Created At:</strong> {user.createdAt}</p>
      </div>
    </main>
  );
}