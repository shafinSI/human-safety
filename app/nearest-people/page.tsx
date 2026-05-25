import Link from "next/link";
import {
  Bell,
  LayoutDashboard,
  Lock,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
  Send,
} from "lucide-react";

export default function NearestPeoplePage() {
  return (
    <main className="nearPage">
      <nav className="nearNav">
        <Link href="/" className="nearBrand">
          <img src="/logo.png" alt="Human Safety" />
          <span>Human <b>Safety</b></span>
        </Link>

        <div className="nearMenu">
          <Link href="/" className="nearMenuItem">
            <ShieldCheck size={22} /> Dashboard
          </Link>
          <span className="nearMenuItem">
            <Bell size={22} /> Alerts
          </span>
          <div className="nearUser">U <span></span></div>
        </div>
      </nav>

      <section className="nearHero">
        <div className="mainIcon">
          <Users size={52} />
          <MapPin className="pinIcon" size={22} />
        </div>

        <h1>
          Trusted People <span>Nearby</span>
        </h1>

        <p>Instantly notify trusted nearby people during emergencies.</p>

        <button className="notifyBtn">
          <Send size={30} /> Notify Trusted People
        </button>

        <div className="privacyText">
          <Lock size={20} />
          Only your location will be shared with trusted people near you.
        </div>
      </section>

      <section className="worksSection">
        <div className="titleLine">
          <span></span>
          <h2>How it works</h2>
          <span></span>
        </div>

        <div className="infoCards">
          <div className="infoCard">
            <div className="cardIcon green"><MapPin size={34} /></div>
            <div>
              <h3>Live Location Sharing</h3>
              <p>Your location is shared securely in real time.</p>
            </div>
          </div>

          <div className="infoCard">
            <div className="cardIcon blue"><Users size={34} /></div>
            <div>
              <h3>Trusted Community</h3>
              <p>Nearby trusted users receive your alert instantly.</p>
            </div>
          </div>

          <div className="infoCard">
            <div className="cardIcon purple"><Zap size={34} /></div>
            <div>
              <h3>Faster Emergency Response</h3>
              <p>Quick help reduces emergency response time.</p>
            </div>
          </div>
        </div>

        <div className="warningBox">
          <ShieldCheck size={44} />
          <div>
            <h3>Use this feature only during real emergency situations.</h3>
            <p>It helps build a safer and more supportive community.</p>
          </div>
          <Users className="ghostIcon" size={90} />
        </div>

        <p className="footerSecure">
          <Lock size={18} /> Your data is secure and encrypted.
        </p>
      </section>
    </main>
  );
}