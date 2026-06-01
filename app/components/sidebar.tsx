"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  ["🏠", "Home", "/"],
  ["🚨", "Emergency Alert", "/emergency-alert"],
  ["📍", "Nearest People", "/nearest-people"],
  ["🛣️", "Safety Travel", "/safety-travel"],
  ["🛡️", "Guardian Mode", "/guardian-mode"],
  ["☎️", "Emergency Contact", "/emergency-contact"],
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="hamburgerBtn" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && <div className="sidebarOverlay" onClick={() => setOpen(false)} />}

      <aside className={open ? "sideDrawer open" : "sideDrawer"}>
        <button className="closeBtn" onClick={() => setOpen(false)}>
          ✕
        </button>

        <Link href="/" className="sidebarBrand">
          <img src="/logo.png" alt="logo" />
          <span>Human Safety</span>
        </Link>

        <nav className="sidebarMenu">
          {menuItems.map(([icon, title, link]) => (
            <Link
              href={link}
              className="sidebarLink"
              key={title}
              onClick={() => setOpen(false)}
            >
              <span>{icon}</span>
              {title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}