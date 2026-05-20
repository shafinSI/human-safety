import nodemailer from 'nodemailer'

function getTransporter() {
  const host = process.env.EMAIL_HOST
  const port = process.env.EMAIL_PORT
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!host || !port || !user || !pass) {
    throw new Error('Email environment variables are missing')
  }
  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: false,
    auth: { user, pass },
  })
}

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
  latitude?: number | null
  longitude?: number | null
}): Promise<{ success: boolean; error?: string }> {
  try {
    const mapLink =
      latitude && longitude
        ? `https://maps.google.com/?q=${latitude},${longitude}`
        : null

    const transporter = getTransporter()

    await transporter.sendMail({
      from: `"Human Safety App 🛡️" <${process.env.EMAIL_USER}>`,
      to,
      subject: `🚨 EMERGENCY ALERT from ${userName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;border:2px solid #dc2626;border-radius:12px;padding:24px;">
          <h1 style="color:#dc2626;margin-top:0;">🚨 Emergency Alert!</h1>
          <p style="font-size:16px;"><strong>${userName}</strong> has triggered an emergency alert!</p>
          <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:12px;margin:16px 0;border-radius:4px;">
            <strong>Message:</strong><br/>${message}
          </div>
          ${mapLink
            ? `<p><strong>📍 Location:</strong> <a href="${mapLink}">View on Google Maps</a></p>`
            : `<p><strong>📍 Location:</strong> Not available</p>`
          }
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
          <p style="color:#6b7280;font-size:12px;">Sent via Human Safety App. If this is a real emergency, call 999 or your local emergency number immediately.</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Failed to send email to ${to}:`, msg)
    return { success: false, error: msg }
  }
}
