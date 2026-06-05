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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

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

    return NextResponse.json({
      stats: {
        contacts,
        guardians,
        alerts,
        travels,
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