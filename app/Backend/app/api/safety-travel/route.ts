import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

// POST — Check route safety (placeholder for Google Maps/external API)
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { origin, destination } = await req.json()
  if (!origin || !destination)
    return NextResponse.json({ error: 'Origin and destination required' }, { status: 400 })

  // This is where you'd integrate Google Routes / Directions API
  // For now returns a structured mock response
  return NextResponse.json({
    origin,
    destination,
    safetyScore: Math.floor(Math.random() * 30) + 70, // 70–100
    tips: [
      'Share your live location with a trusted contact',
      'Stay on well-lit roads',
      'Keep your phone charged',
      'Inform someone of your ETA',
    ],
    estimatedTime: '25 mins',
    distance: '12.4 km',
    googleMapsLink: `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}`,
  })
}
