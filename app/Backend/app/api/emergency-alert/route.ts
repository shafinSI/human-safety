import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { sendEmergencyEmail } from '@/lib/mailer'

// POST — Send emergency alert to all contacts
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { message, latitude, longitude } = await req.json()

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    include: { contacts: true },
  })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Save alert to DB
  const alert = await prisma.emergencyAlert.create({
    data: {
      userId: user.userId,
      message: message || '🚨 I need help! This is an emergency.',
      latitude,
      longitude,
    },
  })

  // Send email to all contacts
  const emailPromises = dbUser.contacts.map((contact) =>
    sendEmergencyEmail({
      to: contact.email,
      userName: dbUser.name,
      message: alert.message,
      latitude,
      longitude,
    })
  )
  await Promise.allSettled(emailPromises)

  return NextResponse.json({
    success: true,
    alert,
    notified: dbUser.contacts.length,
  })
}

// GET — Alert history
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const alerts = await prisma.emergencyAlert.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return NextResponse.json({ alerts })
}
