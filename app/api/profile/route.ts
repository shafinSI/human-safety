import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    user: {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      createdAt: new Date(),
    },
  });
}