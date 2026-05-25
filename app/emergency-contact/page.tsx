"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Contact {
  name: string;
  phone: string;
}

export default function EmergencyContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("emergencyContacts");

    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  function saveToStorage(updated: Contact[]) {
    setContacts(updated);
    localStorage.setItem("emergencyContacts", JSON.stringify(updated));
  }

  function handleSave() {
    if (!name || !phone) return;

    let updated = [...contacts];

    if (editIndex !== null) {
      updated[editIndex] = { name, phone };
      setEditIndex(null);
    } else {
      updated.push({ name, phone });
    }

    saveToStorage(updated);

    setName("");
    setPhone("");
  }

  function handleDelete(index: number) {
    const updated = contacts.filter((_, i) => i !== index);
    saveToStorage(updated);
  }

  function handleEdit(index: number) {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditIndex(index);
  }

  return (
    <main className="contactPage">

      <nav className="contactNavbar">

        <Link href="/" className="contactLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="contactLinks">
          <Link href="/">Dashboard</Link>
          <Link href="/guardian-mode">Guardian Mode</Link>

          <Link
            href="/emergency-contact"
            className="contactActive"
          >
            Emergency Contact
          </Link>
        </div>

        <div className="contactUser">U</div>

      </nav>

      <section className="contactHero">

        <div className="contactLeft">

          <h1>
            Emergency <span>Contact</span>
          </h1>

          <p>
            Add trusted contacts who will be
            notified in an emergency.
          </p>

          <div className="contactCard">

            <div className="inputBox">
              <span>👤</span>

              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputBox">
              <span>📞</span>

              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              className="saveBtn"
              onClick={handleSave}
            >
              ➕ {editIndex !== null ? "Update Contact" : "Save Contact"}
            </button>

          </div>

        </div>

        <div className="contactRight">

          <img
            src="/emergency_contact.png"
            alt="contact"
            className="contactImage"
          />

          <div className="contactFloating">
            <h3>🛡️ Stay Protected, Stay Connected</h3>

            <p>
              Your trusted contacts will be alerted instantly
              when you need help.
            </p>
          </div>

        </div>

      </section>

      <section className="savedSection">

        <h2>Saved Contacts</h2>

        <div className="savedList">

          {contacts.length === 0 && (
            <p className="emptyText">
              No contacts saved yet.
            </p>
          )}

          {contacts.map((contact, index) => (

            <div className="savedCard" key={index}>

              <div className="savedInfo">

                <div className="savedAvatar">
                  {contact.name.charAt(0)}
                </div>

                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.phone}</p>
                </div>

              </div>

              <div className="savedBtns">

                <button
                  className="editBtn"
                  onClick={() => handleEdit(index)}
                >
                  ✏️
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(index)}
                >
                  🗑️
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      <div className="contactBottom">
        🔒 Your contacts are stored securely and never shared with anyone.
      </div>

    </main>
  );
}