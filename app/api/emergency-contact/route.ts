import { prisma } from '../../../lib/prisma'
import { getUserFromRequest } from '../../../lib/auth'
import { sendEmergencyEmail } from '../../../lib/mailer'
import { guardianSchema } from '../../../lib/validate'
export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const contacts = await prisma.emergencyContact.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, phone: true, relation: true, createdAt: true },
    })

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = emergencyContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone, relation } = result.data

    const existing = await prisma.emergencyContact.findFirst({
      where: { userId: user.userId, email },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'A contact with this email already exists' },
        { status: 409 }
      )
    }

    const count = await prisma.emergencyContact.count({ where: { userId: user.userId } })
    if (count >= 10) {
      return NextResponse.json({ error: 'Maximum of 10 emergency contacts allowed' }, { status: 400 })
    }

    const contact = await prisma.emergencyContact.create({
      data: { userId: user.userId, name, email, phone, relation },
      select: { id: true, name: true, email: true, phone: true, relation: true, createdAt: true },
    })

    return NextResponse.json({ contact }, { status: 201 })
  } catch (error) {
    console.error('Add contact error:', error)
    return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = contactIdSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { id } = result.data

    const contact = await prisma.emergencyContact.findFirst({
      where: { id, userId: user.userId },
    })
    if (!contact) return NextResponse.json({ error: 'Contact not found' }, { status: 404 })

    await prisma.emergencyContact.delete({ where: { id } })
    return NextResponse.json({ success: true, message: 'Contact removed' })
  } catch (error) {
    console.error('Delete contact error:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
