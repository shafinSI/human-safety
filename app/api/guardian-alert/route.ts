import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const alert = await prisma.guardianAlert.create({
      data: {
        name: body.name,
        phone: body.phone,
        latitude: body.latitude,
        longitude: body.longitude,
        mapLink: body.mapLink,
      },
    });

    return NextResponse.json({
      success: true,
      alert,
    });
  } catch (error) {
    console.error("Guardian Alert POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save alert",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const alerts = await prisma.guardianAlert.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Guardian Alert GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch alerts",
      },
      {
        status: 500,
      }
    );
  }
}