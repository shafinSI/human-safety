import Link from "next/link";
import Sidebar from "./components/sidebar";

const features = [
  ["🚨", "Emergency Alert", "Send SOS alert with your live location instantly.", "/emergency-alert"],
  ["📍", "Nearest People", "Notify and connect with people near you.", "/nearest-people"],
  ["🛣️", "Safety Travel", "Get safe route suggestions while travelling.", "/safety-travel"],
  ["🛡️", "Guardian Mode", "Share your journey and get real-time updates.", "/guardian-mode"],
  ["☎️", "Emergency Contact", "Save and call trusted contacts quickly.", "/emergency-contact"],
];

export default function Home() {
  return (
    <main className="home">
      <Sidebar />

      <nav className="navbar">
        <Link href="/" className="brand">
          <img
            src="/logo.png"
            alt="Human Safety Logo"
            className="brandLogo"
          />
          <span>Human Safety</span>
        </Link>

       
        <div className="authBtns">
          <Link href="/register" className="helpBtn">Register</Link>
          <Link href="/login" className="helpBtn loginTopBtn">Login</Link>
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
            <Link href="/register" className="primary">
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
    </main>
  );
}