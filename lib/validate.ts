import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().min(7).max(20).optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const emergencyAlertSchema = z.object({
  message: z.string().max(500).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

export const emergencyContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  relation: z.string().max(50).optional(),
})

export const contactIdSchema = z.object({
  id: z.string().min(1),
})

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

export const guardianSchema = z.object({
  isActive: z.boolean(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  destination: z.string().max(200).optional(),
})

export const travelSchema = z.object({
  origin: z.string().min(2).max(200),
  destination: z.string().min(2).max(200),
})
