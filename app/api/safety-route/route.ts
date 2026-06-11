import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const route = await prisma.safetyRouteCheck.create({
      data: {
        startPoint: body.startPoint,
        destination: body.destination,
        score: body.score,
        riskLevel: body.riskLevel,
        mapLink: body.mapLink,
      },
    });

    return NextResponse.json({
      success: true,
      route,
    });
  } catch (error) {
    console.error("Safety Route POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save route",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const routes = await prisma.safetyRouteCheck.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Safety Route GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch routes",
      },
      {
        status: 500,
      }
    );
  }
}