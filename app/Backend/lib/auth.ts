import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const SECRET = process.env.JWT_SECRET!

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { userId: string; email: string }
}

export function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  try {
    const token = authHeader.split(' ')[1]
    return verifyToken(token)
  } catch {
    return null
  }
}
