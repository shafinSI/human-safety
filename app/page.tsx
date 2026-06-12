"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

const features = [
  ["🚨", "Emergency Alert", "Send SOS alert with your live location instantly.", "/emergency-alert"],
  ["📍", "Nearest People", "Notify and connect with people near you.", "/nearest-people"],
  ["🛣️", "Safety Travel", "Get safe route suggestions while travelling.", "/safety-travel"],
  ["🛡️", "Guardian Mode", "Share your journey and get real-time updates.", "/guardian-mode"],
  ["☎️", "Emergency Contact", "Save and call trusted contacts quickly.", "/emergency-contact"],
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "ai",
      text: "Hi! I am your Human Safety AI assistant. Ask me about emergency help, safe travel, or Guardian Mode.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "Sorry, I could not answer right now.",
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI service failed. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home">
      <Sidebar />

      <nav className="navbar">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="Human Safety Logo" className="brandLogo" />
          <span>Human Safety</span>
        </Link>

        <div className="authBtns">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="helpBtn">Dashboard</Link>
              <Link href="/profile" className="helpBtn">Profile</Link>
              <Link href="/change-password" className="helpBtn">Change Password</Link>
              <button onClick={handleLogout} className="helpBtn loginTopBtn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="helpBtn">Register</Link>
              <Link href="/login" className="helpBtn loginTopBtn">Login</Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <p className="miniTag">STAY SAFE WITH HUMAN SAFETY</p>

          <h1>
            Your Safety,<br />
            <span>Our Priority</span>
          </h1>

          <p className="heroDesc">
            Emergency help, safe travel, live location sharing, and trusted
            contact support in one smart safety platform.
          </p>

          <div className="heroBtns">
            <Link href={isLoggedIn ? "/emergency-alert" : "/register"} className="primary">
              Get Help Now 🚨
            </Link>

            <Link href="#features" className="secondary">
              Explore Features →
            </Link>
          </div>
        </div>

        <div className="heroImageBox">
          <img src="/hero-safety.png" alt="Human Safety" className="heroImg" />
        </div>
      </section>

      <section className="stats">
        <div><b>10K+</b><span>Active Users</span></div>
        <div><b>24/7</b><span>Emergency Support</span></div>
        <div><b>100+</b><span>Cities Covered</span></div>
        <div><b>99%</b><span>Safety Commitment</span></div>
      </section>

      <section id="features" className="features">
        <p className="tag">OUR FEATURES</p>
        <h2>Smart Features for Your Safety</h2>
        <p className="sub">
          Everything you need to stay safe, connected and protected.
        </p>

        <div className="cards">
          {features.map(([icon, title, desc, link]) => (
            <Link href={link} className="card" key={title}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span>Learn More →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bottomCta">
        <div>
          <h2>Together, we build a safer world</h2>
          <p>Be aware. Be prepared. Be safe.</p>
        </div>
      </section>

      <button className="aiChatButton" onClick={() => setChatOpen(!chatOpen)}>
        💬 AI Help
      </button>

      {chatOpen && (
        <div className="aiChatBox">
          <div className="aiChatHeader">
            <span>🤖 Human Safety AI</span>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="aiChatMessages">
            {chat.map((item, index) => (
              <div
                key={index}
                className={item.role === "user" ? "userMsg" : "aiMsg"}
              >
                {item.text}
              </div>
            ))}

            {loading && <div className="aiMsg">Thinking...</div>}
          </div>

          <div className="aiChatInput">
            <input
              type="text"
              placeholder="Ask about safety..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </main>
  );
}