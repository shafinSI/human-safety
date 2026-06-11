import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.guardianAlert.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete Guardian Alert Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete alert",
      },
      {
        status: 500,
      }
    );
  }
}