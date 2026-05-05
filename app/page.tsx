import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">

        <div className="heroContent">
          <p className="badge">🚨 Personal Safety Platform</p>

          <h1>
            Human <span>Safety</span> Website
          </h1>

          <p className="subtitle">
            Emergency help, trusted contacts, safe travel, nearest people alert,
            and guardian protection in one place.
          </p>

          <div className="heroButtons">
            <Link href="/emergency-alert" className="btn redBtn">
              Get Help Now
            </Link>

            <Link href="/safety-travel" className="btn blueBtn">
              Safe Travel
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="sectionTitle">
          <p>Our Features</p>
          <h2>Smart protection for emergency situations</h2>
        </div>

        <div className="cardContainer fiveCards">
          <Link href="/emergency-alert" className="card">
            <div className="icon redIcon">🚨</div>
            <h3>Emergency Alert</h3>
            <p>Send emergency danger message with your location.</p>
            <span>Send Alert →</span>
          </Link>

          <Link href="/emergency-contact" className="card">
            <div className="icon greenIcon">📞</div>
            <h3>Emergency Contact</h3>
            <p>Save and manage your trusted emergency contacts.</p>
            <span>Add Contact →</span>
          </Link>

          <Link href="/nearest-people" className="card">
            <div className="icon pinkIcon">📍</div>
            <h3>Nearest People</h3>
            <p>Find and notify nearby trusted people quickly.</p>
            <span>Find People →</span>
          </Link>

          <Link href="/guardian-mode" className="card">
            <div className="icon blueIcon">🛡️</div>
            <h3>Guardian Mode</h3>
            <p>Keep your trusted person updated while travelling.</p>
            <span>Start Mode →</span>
          </Link>

          <Link href="/safety-travel" className="card">
            <div className="icon orangeIcon">🛣️</div>
            <h3>Safety Travel</h3>
            <p>Check safe routes and travel with more confidence.</p>
            <span>Check Route →</span>
          </Link>
        </div>

        <h1>Human Safety Website</h1>
        <p>Emergency help, safe travel, and trusted contact protection in one place.</p>

        <div className="hero-buttons">
          <Link href="/emergency-alert" className="hero-btn emergency-btn">
            Get Help Now
          </Link>

          <a href="#features" className="hero-btn explore-btn">
            Explore Features
          </a>
        </div>
      </section>

      <section id="features" className="feature-grid">
        <FeatureCard title="🚨 Emergency Alert" text="Send instant danger alert with location." link="/emergency-alert" />
        <FeatureCard title="📍 Nearest People" text="Notify nearby trusted people quickly." link="/nearest-people" />
        <FeatureCard title="🛣️ Safety Travel" text="Check your route before travelling." link="/safety-travel" />
        <FeatureCard title="🛰️ Guardian Mode" text="Share your live travel status." link="/guardian-mode" />
        <FeatureCard title="📞 Emergency Contact" text="Save and manage trusted contacts." link="/emergency-contact" />
 f4e286af1eb6ba3cfe680b0b3aeee3819d190f53
      </section>

      <footer className="footer">
        © 2026 Human Safety. Designed for emergency support and safer travel.
      </footer>
    </main>
  );
}