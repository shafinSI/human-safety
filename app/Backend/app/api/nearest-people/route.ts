import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { sendEmergencyEmail } from '@/lib/mailer'

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// POST — Update user location
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { latitude, longitude } = await req.json()
  await prisma.user.update({
    where: { id: user.userId },
    data: { latitude, longitude },
  })
  return NextResponse.json({ success: true })
}

// GET — Find nearby users (within 5km) and alert them
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
  if (!dbUser?.latitude || !dbUser?.longitude)
    return NextResponse.json({ error: 'Update your location first' }, { status: 400 })

  const allUsers = await prisma.user.findMany({
    where: { id: { not: user.userId }, latitude: { not: null }, longitude: { not: null } },
  })

  const nearby = allUsers.filter((u) => {
    const dist = getDistanceKm(dbUser.latitude!, dbUser.longitude!, u.latitude!, u.longitude!)
    return dist <= 5
  })

  // Send alert emails to nearby users
  const emailPromises = nearby.map((u) =>
    sendEmergencyEmail({
      to: u.email,
      userName: dbUser.name,
      message: '🚨 Someone near you needs help! Please check your surroundings.',
      latitude: dbUser.latitude!,
      longitude: dbUser.longitude!,
    })
  )
  await Promise.allSettled(emailPromises)

  return NextResponse.json({ nearbyCount: nearby.length, notified: nearby.length })
}
