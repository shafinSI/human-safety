import "./globals.css";
import { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}