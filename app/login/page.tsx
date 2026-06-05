"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

     if (res.ok) {
            localStorage.setItem("token", data.token);
                   window.location.href = "/";
            } else {
                alert(data.error || "Login failed");
             } 
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="loginPage">
      <Link href="/" className="authHomeBrand">
        <img src="/logo.png" alt="Human Safety" className="authHomeLogo" />
        <span className="authHomeText">
          <b>Home</b>
        </span>
      </Link>

      <section className="loginHero">
        <div className="loginLeft">
          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>
            Login to access emergency alerts, live tracking, and trusted safety
            support.
          </p>

          <div className="loginShield">
            <ShieldCheck size={120} />
          </div>
        </div>

        <div className="loginCard">
          <div className="loginIcon">
            <ShieldCheck size={42} />
          </div>

          <h2>Login</h2>
          <p className="loginSubtitle">Enter your details to continue</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <div className="loginInput">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>
            <div className="loginInput">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Eye size={20} />
            </div>

            <div className="loginOptions">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link href="#">Forgot password?</Link>
            </div>

            <button type="submit" className="loginBtn">
              Login →
            </button>
          </form>

          <p className="loginRegister">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>
        </div>
      </section>
    </main>
  );
}