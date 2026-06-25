import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "OpenAI API key is missing." },
        { status: 500 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { reply: "Please type a message first." },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Human Safety AI assistant. Give short, helpful safety advice about emergency help, safe travel, Guardian Mode, SOS alerts, and trusted contacts.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply:
        response.choices[0]?.message?.content ||
        "Sorry, I could not generate a response.",
    });
  } catch (error: any) {
    console.error("Chat API Error:", error?.message || error);

    return NextResponse.json(
      {
        reply:
          "AI response failed. Please check API key, billing, or server terminal error.",
      },
      { status: 500 }
    );
  }
}