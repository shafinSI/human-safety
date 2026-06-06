"use client";

import Sidebar from "../components/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function EmergencyContact() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  async function fetchCurrentUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok && data.user) {
      setUser(data.user);
      fetchContacts(data.user.id);
    } else {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  async function fetchContacts(userId: number) {
    const res = await fetch(`/api/emergency-contact?userId=${userId}`);
    const data = await res.json();

    setContacts(data.contacts || []);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function handleSave() {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!name.trim() || !phone.trim() || !relation.trim()) {
      alert("All fields are required");
      return;
    }

    const method = editId ? "PUT" : "POST";

    const body = editId
      ? {
          id: editId,
          name,
          phone,
          relation,
        }
      : {
          name,
          phone,
          relation,
          userId: user.id,
        };

    const res = await fetch("/api/emergency-contact", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert(editId ? "Contact updated" : "Contact added");

      setName("");
      setPhone("");
      setRelation("");
      setEditId(null);

      fetchContacts(user.id);
    } else {
      alert(data.error || "Something went wrong");
    }
  }

  async function handleDelete(id: number) {
    if (!user) return;

    const res = await fetch("/api/emergency-contact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("Contact deleted");
      fetchContacts(user.id);
    }
  }

  function handleEdit(contact: Contact) {
    setEditId(contact.id);
    setName(contact.name);
    setPhone(contact.phone);
    setRelation(contact.relation);
  }

  return (
    <main className="contactPage">
      <Sidebar />

      <nav className="contactNavbar">
        <Link href="/" className="contactLogo">
          <img src="/logo.png" alt="logo" />
          Human <span>Safety</span>
        </Link>

        <div className="contactUser">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      </nav>

      <section className="contactHero">
        <div className="contactLeft">
          <h1>
            Emergency <span>Contact</span>
          </h1>

          <p>Add trusted contacts who will be notified in an emergency.</p>

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

            <div className="inputBox">
              <span>👥</span>

              <input
                type="text"
                placeholder="Enter relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              />
            </div>

            <button className="saveBtn" onClick={handleSave}>
              ➕ {editId ? "Update Contact" : "Save Contact"}
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
              Your trusted contacts will be alerted instantly when you need
              help.
            </p>
          </div>
        </div>
      </section>

      <section className="savedSection">
        <h2>Saved Contacts</h2>

        <div className="savedList">
          {contacts.length === 0 && (
            <p className="emptyText">No contacts saved yet.</p>
          )}

          {contacts.map((contact) => (
            <div className="savedCard" key={contact.id}>
              <div className="savedInfo">
                <div className="savedAvatar">
                  {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
                </div>

                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.phone}</p>
                  <p>{contact.relation}</p>
                </div>
              </div>

              <div className="savedBtns">
                <button className="editBtn" onClick={() => handleEdit(contact)}>
                  ✏️
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(contact.id)}
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