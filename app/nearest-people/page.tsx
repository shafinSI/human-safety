"use client";

import Sidebar from "../components/sidebar";
import { Lock, MapPin, ShieldCheck, Users, Zap, Send } from "lucide-react";
import { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  phone: string;
  relation?: string;
};

export default function NearestPeoplePage() {
  const [location, setLocation] = useState<any>(null);
  const [notified, setNotified] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setContacts([]);
          return;
        }

        const contactRes = await fetch("/api/emergency-contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contactData = await contactRes.json();

        if (Array.isArray(contactData.contacts)) {
          setContacts(contactData.contacts);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Contact load error:", error);
        setContacts([]);
      }
    };

    loadContacts();
  }, []);

  const formatPhoneForWhatsapp = (phone: string) => {
    if (phone.startsWith("0")) return "88" + phone;
    return phone;
  };

  const saveNearbyAlert = async (lat: number, lng: number) => {
    try {
      await fetch("/api/nearby-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          message: "Emergency help requested from nearby trusted people",
        }),
      });
    } catch (error) {
      console.error("Nearby alert save error:", error);
    }
  };

  const notifyTrustedPeople = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLocation(currentLocation);
        setNotified(true);
        saveNearbyAlert(currentLocation.lat, currentLocation.lng);

        alert("Trusted nearby people notified successfully");
      },
      (err) => alert("Location error: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  const mapLink = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
    : "";

  const alertMessage = location
    ? `Emergency Alert! I need help. My location: ${mapLink}`
    : "";

  return (
    <main className="nearPage">
      <Sidebar />

      <section className="nearHero">
        <div className="mainIcon">
          <Users size={52} />
          <MapPin className="pinIcon" size={22} />
        </div>

        <h1>
          Trusted People <span>Nearby</span>
        </h1>

        <p>Instantly notify your saved emergency contacts during emergencies.</p>

        <button className="notifyBtn" onClick={notifyTrustedPeople}>
          <Send size={30} /> Notify Trusted People
        </button>

        {location && (
          <div className="nearResultBox">
            <h3>📍 Current Location Shared</h3>

            <p>
              <b>Latitude:</b> {location.lat}
            </p>

            <p>
              <b>Longitude:</b> {location.lng}
            </p>

            <a href={mapLink} target="_blank">
              🗺️ Open Location
            </a>

            <h3>👥 Emergency Contacts</h3>

            {contacts.length === 0 ? (
              <p>No emergency contacts found. Please add contacts first.</p>
            ) : (
              contacts.map((person) => (
                <div className="nearPersonCard" key={person.id}>
                  <p>
                    <b>{person.name}</b>
                  </p>

                  <p>Phone: {person.phone}</p>

                  <p>Relation: {person.relation || "Trusted Contact"}</p>

                  <div className="nearActionBtns">
                    <a
                      href={`https://wa.me/${formatPhoneForWhatsapp(
                        person.phone
                      )}?text=${encodeURIComponent(alertMessage)}`}
                      target="_blank"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`sms:${person.phone}?body=${encodeURIComponent(
                        alertMessage
                      )}`}
                    >
                      SMS
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {notified && (
          <p className="nearSuccessText">
            ✅ Alert sent to trusted emergency contacts.
          </p>
        )}

        <div className="privacyText">
          <Lock size={20} />
          Only your location will be shared with trusted people.
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
            <div className="cardIcon green">
              <MapPin size={34} />
            </div>
            <div>
              <h3>Live Location Sharing</h3>
              <p>Your location is shared securely in real time.</p>
            </div>
          </div>

          <div className="infoCard">
            <div className="cardIcon blue">
              <Users size={34} />
            </div>
            <div>
              <h3>Trusted Contacts</h3>
              <p>Your saved emergency contacts receive your alert.</p>
            </div>
          </div>

          <div className="infoCard">
            <div className="cardIcon purple">
              <Zap size={34} />
            </div>
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