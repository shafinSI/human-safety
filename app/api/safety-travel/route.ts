import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { startLocation, endLocation, travelMode, userId } = await req.json();

    if (!startLocation || !endLocation || !travelMode || !userId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const travel = await prisma.safetyTravel.create({
      data: {
        startLocation,
        endLocation,
        travelMode,
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      { message: "Safety travel created successfully", travel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Safety Travel POST Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const travels = await prisma.safetyTravel.findMany({
      where: userId ? { userId: Number(userId) } : {},
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ travels });
  } catch (error) {
    console.error("Safety Travel GET Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, startLocation, endLocation, travelMode, status } =
      await req.json();

    const travel = await prisma.safetyTravel.update({
      where: {
        id: Number(id),
      },
      data: {
        startLocation,
        endLocation,
        travelMode,
        status,
      },
    });

    return NextResponse.json({
      message: "Safety travel updated successfully",
      travel,
    });
  } catch (error) {
    console.error("Safety Travel PUT Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const travel = await prisma.safetyTravel.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Safety travel deleted successfully",
      travel,
    });
  } catch (error) {
    console.error("Safety Travel DELETE Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}