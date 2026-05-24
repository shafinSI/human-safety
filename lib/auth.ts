import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET is missing or too short (min 32 characters)')
  }
  return secret
}

export function signToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, getSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string; email: string } {
  return jwt.verify(token, getSecret()) as { userId: string; email: string }
}

export function getUserFromRequest(req: NextRequest): { userId: string; email: string } | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  try {
    const token = authHeader.split(' ')[1]
    return verifyToken(token)
  } catch {
    return null
  }
}
