import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

type JwtPayload = {
  id: number;
  email: string;
};

function getUserId(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;

  return decoded.id;
}

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const body = await req.json();

    const { name, phone, relation } = body;

    if (!name || !phone || !relation) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contact = await prisma.emergencyContact.create({
      data: {
        name,
        phone,
        relation,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Emergency contact added successfully",
        contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Emergency Contact Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = getUserId(req);

    const contacts = await prisma.emergencyContact.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    getUserId(req);

    const { id } = await req.json();

    const contact = await prisma.emergencyContact.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Contact deleted successfully",
      contact,
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    getUserId(req);

    const { id, name, phone, relation } = await req.json();

    const contact = await prisma.emergencyContact.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        phone,
        relation,
      },
    });

    return NextResponse.json({
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update Contact Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}