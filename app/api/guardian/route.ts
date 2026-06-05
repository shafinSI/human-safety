import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone, email, userId } = await req.json();

    if (!name || !phone || !email || !userId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const guardian = await prisma.guardian.create({
      data: {
        name,
        phone,
        email,
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      { message: "Guardian added successfully", guardian },
      { status: 201 }
    );
  } catch (error) {
    console.error("Guardian POST Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const guardians = await prisma.guardian.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ guardians });
  } catch (error) {
    console.error("Guardian GET Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const { id, name, phone, email } = await req.json();

    const guardian = await prisma.guardian.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        phone,
        email,
      },
    });

    return NextResponse.json({
      message: "Guardian updated successfully",
      guardian,
    });
  } catch (error) {
    console.error("Guardian PUT Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const guardian = await prisma.guardian.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Guardian deleted successfully",
      guardian,
    });
  } catch (error) {
    console.error("Guardian DELETE Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}