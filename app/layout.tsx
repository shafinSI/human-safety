import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Safety App",
  description: "Emergency safety and travel protection website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="logo">
            <span className="logoIcon">🛡️</span>
            <span className="logoText">Safety App</span>
          </Link>

          <div className="navLinks">
            <Link href="/">Home</Link>
            <Link href="/emergency-alert">Emergency</Link>
            <Link href="/emergency-contact">Contact</Link>
            <Link href="/nearest-people">Nearest People</Link>
            <Link href="/guardian-mode">Guardian Mode</Link>
            <Link href="/safety-travel">Travel</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}