import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmergencyEmail({
  to,
  userName,
  message,
  latitude,
  longitude,
}: {
  to: string
  userName: string
  message: string
  latitude?: number
  longitude?: number
}) {
  const mapLink =
    latitude && longitude
      ? `https://maps.google.com/?q=${latitude},${longitude}`
      : 'Location not available'

  await transporter.sendMail({
    from: `"Human Safety App 🛡️" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🚨 EMERGENCY ALERT from ${userName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:2px solid red;border-radius:8px;padding:20px;">
        <h1 style="color:red;">🚨 Emergency Alert!</h1>
        <p><strong>${userName}</strong> has sent an emergency alert!</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Location:</strong> <a href="${mapLink}">${mapLink}</a></p>
        <p style="color:gray;font-size:12px;">Sent via Human Safety App</p>
      </div>
    `,
  })
}
