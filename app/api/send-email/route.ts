import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_RECEIVER,
      subject: "🚨 Emergency Alert",
      text: message,
    });

    return NextResponse.json({ success: true, id: info.messageId });
  } catch (error: any) {
    console.log("EMAIL ERROR:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}