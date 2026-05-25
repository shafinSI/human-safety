import { NextRequest, NextResponse } from 'next/server'
import { travelSchema } from '../../../lib/validate'

function getSafetyTips(hour: number): string[] {
  const isNight = hour >= 20 || hour < 6

  return isNight
    ? [
        'It is night time — stay on well-lit roads',
        'Share your live location with a trusted contact',
        'Avoid isolated areas and shortcuts',
        'Keep your phone charged and accessible',
        'Inform someone of your ETA and route',
        'Trust your instincts — if something feels wrong, change your route',
      ]
    : [
        'Share your live location with a trusted contact',
        'Stay on main roads where possible',
        'Keep your phone charged and accessible',
        'Inform someone of your ETA',
        'Stay aware of your surroundings',
        'Keep emergency contacts easily accessible',
      ]
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = travelSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { origin, destination } = result.data

    const currentHour = new Date().getHours()
    const isNight = currentHour >= 20 || currentHour < 6
    const tips = getSafetyTips(currentHour)

    return NextResponse.json({
      success: true,
      origin,
      destination,
      isNight,
      safetyLevel: isNight ? 'caution' : 'normal',
      tips,
      googleMapsLink: `https://maps.google.com/maps?saddr=${encodeURIComponent(
        origin
      )}&daddr=${encodeURIComponent(destination)}`,
      message: isNight
        ? '🌙 Night travel — extra caution advised. Share your location with contacts.'
        : '☀️ Safe travel hours. Stay alert and keep contacts informed.',
    })
  } catch (error) {
    console.error('Safety travel error:', error)

    return NextResponse.json(
      { error: 'Failed to get travel safety info' },
      { status: 500 }
    )
  }
}