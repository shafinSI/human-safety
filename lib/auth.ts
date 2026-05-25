import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  })
}

export function getUserFromRequest(req: NextRequest) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]

  try {
    return jwt.verify(token, secret) as {
      userId: string
      email: string
    }
  } catch {
    return null
  }
}