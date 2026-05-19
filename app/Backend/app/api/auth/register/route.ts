import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json()

    if (!name || !email || !password)
      return NextResponse.json({ error: 'Name, email, password required' }, { status: 400 })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing)
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone },
    })

    const token = signToken({ userId: user.id, email: user.email })
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
