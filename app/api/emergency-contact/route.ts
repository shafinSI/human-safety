import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, relation, userId } = body;

    if (!name || !phone || !relation || !userId) {
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
        userId: Number(userId),
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
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const contacts = await prisma.emergencyContact.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      contacts,
    });
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