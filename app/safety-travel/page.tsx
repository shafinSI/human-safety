"use client";
import Sidebar from "../components/sidebar";
import Link from "next/link";

export default function SafetyTravel() {
  return (
    <main className="travelPage">
        <Sidebar />

      <nav className="travelNavbar">

        <Link href="/" className="travelLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="travelLinks">
           <Link href="/safety-travel#travel-guides">Guides</Link>
        </div>

        <div className="travelUser">U</div>

      </nav>

      <section className="travelHero">

        <div className="travelLeft">

          <h1>
            Plan Safe.
            <br />
            Travel Confident.
          </h1>

          <div className="travelLine"></div>

          <p>
            Get a quick safety overview of your
            travel route and stay one step ahead.
          </p>

          <img
            src="/safety_travel.png"
            alt="travel"
            className="travelImage"
          />

        </div>

        <div className="travelRight">

          <div className="travelCard">

            <h2>Check Your Route Safety</h2>

            <div className="travelInput">

              <div>
                <label>Starting Point</label>

                <input
                  type="text"
                  placeholder="Enter starting location"
                />
              </div>

            </div>

            <div className="travelInput">

              <div>
                <label>Destination</label>

                <input
                  type="text"
                  placeholder="Enter destination location"
                />
              </div>

            </div>

            <button className="travelBtn">
              🛡️ Analyze Route
            </button>

            <p className="travelSmall">
              🔒 We use trusted data sources to analyze route safety.
            </p>

          </div>

        </div>

      </section>

      <section
        className="travelFeatures"
        id="travel-guides"
      >

        <div>
          <h3>🛡️ Risk Assessment</h3>
          <p>
            See potential risks along your travel path.
          </p>
        </div>

        <div>
          <h3>👥 Crowd & Area Info</h3>
          <p>
            Check crowd density and neighborhood safety.
          </p>
        </div>

        <div>
          <h3>⚠️ Incident Alerts</h3>
          <p>
            Get real-time updates on incidents and hazards.
          </p>
        </div>

        <div>
          <h3>💙 Travel Tips</h3>
          <p>
            Receive smart tips for a safer journey.
          </p>
        </div>

      </section>

      <div className="travelBottom">
        ⓘ Your safety is our priority.
        Always stay alert and travel smart.
      </div>

    </main>
  );
}