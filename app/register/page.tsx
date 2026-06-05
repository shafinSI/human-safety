"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
         window.location.href = "/login";
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="registerPage">
      <Link href="/" className="authHomeBrand">
        <img src="/logo.png" alt="Human Safety" className="authHomeLogo" />
        <span className="authHomeText">
          <b>Home</b>
        </span>
      </Link>

      <section className="registerHero">
        <div className="registerLeft">
          <h1>
            Create Your <span>Account</span>
          </h1>

          <p>
            Join Human Safety and stay connected with your trusted contacts.
            Your safety is our priority.
          </p>

          <div className="registerShield">🛡️</div>
        </div>

        <div className="registerCard">
          <div className="registerIcon">
            <User size={42} />
          </div>

          <h2>Register</h2>
          <p className="registerSubtitle">
            Fill in the details to create your account
          </p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <div className="registerInput">
              <User size={20} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <label>Email</label>
            <div className="registerInput">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Phone Number</label>
            <div className="registerInput">
              <Phone size={20} />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <label>Password</label>
            <div className="registerInput">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Eye size={20} />
            </div>

            <label>Confirm Password</label>
            <div className="registerInput">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Eye size={20} />
            </div>

            <div className="registerCheck">
              <input type="checkbox" required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </div>

            <button type="submit" className="registerBtn">
              Register →
            </button>
          </form>

          <p className="registerLogin">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}