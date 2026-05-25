import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getUserFromRequest } from '../../../../lib/auth'
import { sendEmergencyEmail } from '../../../../lib/mailer'
import { guardianSchema } from '../../../../lib/validate'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const guardian = await prisma.guardianMode.findUnique({ where: { userId: user.userId } })
    return NextResponse.json({ guardian: guardian ?? null })
  } catch (error) {
    console.error('Get guardian error:', error)
    return NextResponse.json({ error: 'Failed to fetch guardian mode' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = guardianSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { isActive, latitude, longitude, destination } = result.data

    const guardian = await prisma.guardianMode.upsert({
      where: { userId: user.userId },
      update: { isActive, latitude: latitude ?? null, longitude: longitude ?? null, destination: destination ?? null },
      create: { userId: user.userId, isActive, latitude: latitude ?? null, longitude: longitude ?? null, destination: destination ?? null },
    })

    if (isActive) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        include: { contacts: true },
      })
      if (dbUser && dbUser.contacts.length > 0) {
        const emailResults = await Promise.allSettled(
          dbUser.contacts.map((c) =>
            sendEmergencyEmail({
              to: c.email,
              userName: dbUser.name,
              message: `🛰️ Guardian Mode activated.\nDestination: ${destination || 'Not specified'}.\nThey will check in when they arrive safely.`,
              latitude: latitude ?? null,
              longitude: longitude ?? null,
            })
          )
        )
        const notified = emailResults.filter(
          (r) => r.status === 'fulfilled' && r.value.success
        ).length
        return NextResponse.json({ guardian, contactsNotified: notified })
      }
    }

    return NextResponse.json({ guardian, contactsNotified: 0 })
  } catch (error) {
    console.error('Guardian mode error:', error)
    return NextResponse.json({ error: 'Failed to update guardian mode' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const guardian = await prisma.guardianMode.findUnique({ where: { userId: user.userId } })
    if (!guardian) return NextResponse.json({ error: 'Guardian mode not found' }, { status: 404 })

    await prisma.guardianMode.update({
      where: { userId: user.userId },
      data: { isActive: false },
    })

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { contacts: true },
    })
    if (dbUser && dbUser.contacts.length > 0) {
      await Promise.allSettled(
        dbUser.contacts.map((c) =>
          sendEmergencyEmail({
            to: c.email,
            userName: dbUser.name,
            message: `✅ ${dbUser.name} has arrived safely and turned off Guardian Mode. No action needed.`,
          })
        )
      )
    }

    return NextResponse.json({ success: true, message: 'Guardian mode deactivated' })
  } catch (error) {
    console.error('Deactivate guardian error:', error)
    return NextResponse.json({ error: 'Failed to deactivate guardian mode' }, { status: 500 })
  }
}
