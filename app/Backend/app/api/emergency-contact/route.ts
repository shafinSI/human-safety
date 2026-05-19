import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

// GET — List contacts
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ contacts })
}

// POST — Add contact
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, email, phone, relation } = await req.json()
  if (!name || !email)
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 })

  const contact = await prisma.emergencyContact.create({
    data: { userId: user.userId, name, email, phone, relation },
  })
  return NextResponse.json({ contact }, { status: 201 })
}

// DELETE — Remove contact
export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  const contact = await prisma.emergencyContact.findFirst({
    where: { id, userId: user.userId },
  })
  if (!contact) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.emergencyContact.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
