import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const alert = await prisma.nearbyAlert.create({
      data: {
        latitude: body.latitude,
        longitude: body.longitude,
        message: body.message,
      },
    });

    return NextResponse.json({
      success: true,
      alert,
    });
  } catch (error) {
    console.error("Nearby Alert Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to save nearby alert" },
      { status: 500 }
    );
  }
}