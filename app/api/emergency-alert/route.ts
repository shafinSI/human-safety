import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, message, location, userId } = await req.json();

    if (!title || !message || !userId) {
      return NextResponse.json(
        { error: "Title, message and userId are required" },
        { status: 400 }
      );
    }

    const alert = await prisma.emergencyAlert.create({
      data: {
        title,
        message,
        location,
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      {
        message: "Emergency alert created successfully",
        alert,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Emergency Alert POST Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const alerts = await prisma.emergencyAlert.findMany({
      where: userId ? { userId: Number(userId) } : {},
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("Emergency Alert GET Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, message, location, status } = await req.json();

    const alert = await prisma.emergencyAlert.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        message,
        location,
        status,
      },
    });

    return NextResponse.json({
      message: "Emergency alert updated successfully",
      alert,
    });
  } catch (error) {
    console.error("Emergency Alert PUT Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const alert = await prisma.emergencyAlert.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Emergency alert deleted successfully",
      alert,
    });
  } catch (error) {
    console.error("Emergency Alert DELETE Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}