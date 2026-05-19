import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { sendEmergencyEmail } from '@/lib/mailer'

// GET — Current guardian status
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const guardian = await prisma.guardianMode.findFirst({
    where: { userId: user.userId },
  })
  return NextResponse.json({ guardian })
}

// POST — Enable/update guardian mode
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { isActive, latitude, longitude, destination } = await req.json()

  const guardian = await prisma.guardianMode.upsert({
    where: { id: (await prisma.guardianMode.findFirst({ where: { userId: user.userId } }))?.id || '' },
    update: { isActive, latitude, longitude, destination },
    create: { userId: user.userId, isActive, latitude, longitude, destination },
  })

  // Notify contacts when guardian mode is toggled
  if (isActive) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { contacts: true },
    })
    if (dbUser) {
      const emailPromises = dbUser.contacts.map((c) =>
        sendEmergencyEmail({
          to: c.email,
          userName: dbUser.name,
          message: `🛰️ Guardian Mode activated. Destination: ${destination || 'Not specified'}. I'll check in when I arrive.`,
          latitude,
          longitude,
        })
      )
      await Promise.allSettled(emailPromises)
    }
  }

  return NextResponse.json({ guardian })
}
