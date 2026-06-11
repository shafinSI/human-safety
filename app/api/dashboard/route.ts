import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

type JwtPayload = {
  id: number;
  email: string;
};

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const contacts = await prisma.emergencyContact.count({
      where: { userId: decoded.id },
    });

    const guardians = await prisma.guardian.count({
      where: { userId: decoded.id },
    });

    const alerts = await prisma.emergencyAlert.count({
      where: { userId: decoded.id },
    });

    const travels = await prisma.safetyTravel.count({
      where: { userId: decoded.id },
    });

    const guardianAlerts = await prisma.guardianAlert.count();

    const safetyRoutes = await prisma.safetyRouteCheck.count();

    const latestGuardianAlert = await prisma.guardianAlert.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const latestRoute = await prisma.safetyRouteCheck.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      stats: {
        contacts,
        guardians,
        alerts,
        travels,
        guardianAlerts,
        safetyRoutes,
      },
      recent: {
        latestGuardianAlert,
        latestRoute,
      },
    });
  } catch (error: any) {
    console.error("Dashboard Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}