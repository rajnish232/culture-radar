import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { trend } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return NextResponse.json({ error: 'No API key' }, { status: 401 });

  const prompt = `
  Explain this internet trend or meme in a simple, fun Gen Z way:
  "${trend}"
  
  Include what it is, where it started, and why it’s viral.
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No explanation found';

  return NextResponse.json({ explanation });
}
