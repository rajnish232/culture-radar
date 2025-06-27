import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// ✅ Initialize Supabase Admin client (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  // 1. Get current user (server request context)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return NextResponse.json({ error: 'User not found or not logged in' }, { status: 401 });
  }

  const email = user.email;

  // 2. Create email content
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>📬 Your Daily Culture Digest</h2>
      <ul>
        <li><strong>Twitter:</strong> Elon roasted again 🐦🔥</li>
        <li><strong>Reddit:</strong> New Skibidi Doge meme everywhere 😂</li>
        <li><strong>AI Tools:</strong> Gemini now doing video analysis 🎥🤖</li>
      </ul>
      <p style="margin-top: 16px;">Sent by your Real-Time Culture Radar 🧠</p>
    </div>
  `;

  // 3. Send using Resend
  const { error } = await resend.emails.send({
    from: 'CultureRadar <onboarding@resend.dev>',
    to: email,
    subject: '🔥 Your Culture Trends for Today',
    html,
  });

  if (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
