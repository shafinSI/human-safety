import Link from "next/link";

function FeatureCard({
  title,
  text,
  link,
}: {
  title: string;
  text: string;
  link: string;
}) {
  return (
    <Link href={link} className="card">
      <div className="icon">{title.split(" ")[0]}</div>
      <h3>{title.replace(title.split(" ")[0], "").trim()}</h3>
      <p>{text}</p>
      <span>Open →</span>
    </Link>
  );
}

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
          <FeatureCard
            title="🚨 Emergency Alert"
            text="Send instant danger alert with your location."
            link="/emergency-alert"
          />

          <FeatureCard
            title="📞 Emergency Contact"
            text="Save and manage trusted emergency contacts."
            link="/emergency-contact"
          />

          <FeatureCard
            title="📍 Nearest People"
            text="Notify nearby trusted people quickly."
            link="/nearest-people"
          />

          <FeatureCard
            title="🛰️ Guardian Mode"
            text="Share your live travel status with trusted contacts."
            link="/guardian-mode"
          />

          <FeatureCard
            title="🛣️ Safety Travel"
            text="Check your route before travelling."
            link="/safety-travel"
          />
        </div>
      </section>
    </main>
  );
}