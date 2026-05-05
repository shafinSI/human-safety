"use client";

import { useState } from "react";

type Contact = {
  name: string;
  phone: string;
};

export default function EmergencyContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Safin", phone: "0293948" },
  ]);

  const saveContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter name and phone number");
      return;
    }

    setContacts([...contacts, { name, phone }]);
    setName("");
    setPhone("");
  };

  const deleteContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <main className="contactPage">
      <section className="contactBox">
        <p className="contactBadge">📞 Trusted Emergency Contact</p>

        <h1>Emergency Contact</h1>

        <p className="contactDesc">
          Add trusted emergency contacts for quick help.
        </p>

        <div className="contactForm">
          <input
            type="text"
            placeholder="Enter contact name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={saveContact}>Save Contact</button>
        </div>

        <div className="savedContacts">
          <h2>Saved Contacts</h2>

          {contacts.length === 0 ? (
            <p className="emptyText">No contacts saved yet.</p>
          ) : (
            <div className="contactList">
              {contacts.map((contact, index) => (
                <div className="contactItem" key={index}>
                  <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.phone}</p>
                  </div>

                  <button onClick={() => deleteContact(index)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}