import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { sendEmergencyEmail } from '@/lib/mailer'
import { locationSchema } from '@/lib/validate'

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = locationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { latitude, longitude } = result.data

    await prisma.user.update({
      where: { id: user.userId },
      data: { latitude, longitude },
    })

    return NextResponse.json({ success: true, message: 'Location updated' })
  } catch (error) {
    console.error('Update location error:', error)
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (dbUser.latitude === null || dbUser.longitude === null) {
      return NextResponse.json(
        { error: 'Please update your location first' },
        { status: 400 }
      )
    }

    const allUsers = await prisma.user.findMany({
      where: { id: { not: user.userId }, latitude: { not: null }, longitude: { not: null } },
      select: { id: true, name: true, email: true, latitude: true, longitude: true },
    })

    const nearby = allUsers.filter((u) =>
      getDistanceKm(dbUser.latitude!, dbUser.longitude!, u.latitude!, u.longitude!) <= 5
    )

    if (nearby.length === 0) {
      return NextResponse.json({ success: true, nearbyCount: 0, notified: 0 })
    }

    const emailResults = await Promise.allSettled(
      nearby.map((u) =>
        sendEmergencyEmail({
          to: u.email,
          userName: dbUser.name,
          message: '🚨 Someone near you needs help! Please check your surroundings.',
          latitude: dbUser.latitude,
          longitude: dbUser.longitude,
        })
      )
    )

    const succeeded = emailResults.filter(
      (r) => r.status === 'fulfilled' && r.value.success
    ).length

    return NextResponse.json({ success: true, nearbyCount: nearby.length, notified: succeeded })
  } catch (error) {
    console.error('Nearest people error:', error)
    return NextResponse.json({ error: 'Failed to alert nearby people' }, { status: 500 })
  }
}
