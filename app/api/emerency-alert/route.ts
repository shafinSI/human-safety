import { prisma } from '../../../lib/prisma'
import { getUserFromRequest } from '../../../lib/auth'
import { sendEmergencyEmail } from '../../../lib/mailer'
import { emergencyAlertSchema } from '../../../lib/validate'
export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = emergencyAlertSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { message, latitude, longitude } = result.data

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { contacts: true },
    })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (dbUser.contacts.length === 0) {
      return NextResponse.json(
        { error: 'No emergency contacts found. Please add contacts first.' },
        { status: 400 }
      )
    }

    const alert = await prisma.emergencyAlert.create({
      data: {
        userId: user.userId,
        message: message || '🚨 I need help! This is an emergency.',
        latitude: latitude ?? null,
        longitude: longitude ?? null,
      },
    })

    const emailResults = await Promise.allSettled(
      dbUser.contacts.map((contact) =>
        sendEmergencyEmail({
          to: contact.email,
          userName: dbUser.name,
          message: alert.message,
          latitude: latitude ?? null,
          longitude: longitude ?? null,
        })
      )
    )

    const succeeded = emailResults.filter(
      (r) => r.status === 'fulfilled' && r.value.success
    ).length

    return NextResponse.json({
      success: true,
      alert,
      emailsSent: succeeded,
      emailsFailed: dbUser.contacts.length - succeeded,
      totalContacts: dbUser.contacts.length,
    })
  } catch (error) {
    console.error('Emergency alert error:', error)
    return NextResponse.json({ error: 'Failed to send emergency alert' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const alerts = await prisma.emergencyAlert.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error('Get alerts error:', error)
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 })
  }
}
