import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createRouteHandlerClient } from '@supabase/ssr/server'; // Corrected import path
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('Supabase getUser (server-side) data:', user);
  console.log('Supabase getUser (server-side) error:', authError);

  if (authError || !user?.email) {
    return NextResponse.json({ error: 'User not found or not logged in' }, { status: 401 });
  }

  // Get all users who enabled email_digest
  const { data: preferences, error } = await supabase
    .from('preferences')
    .select('user_id')
    .eq('email_digest', true);

  if (error || !preferences) {
    return NextResponse.json({ error: 'No subscribed users' }, { status: 400 });
  }

  // Fetch emails for all user_ids
  const emails: string[] = [];

  for (const pref of preferences) {
    const { data: userData } = await supabase
      .from('users') // if you're using custom user table (skip if not)
      .select('email')
      .eq('id', pref.user_id)
      .single();

    if (userData?.email) emails.push(userData.email);
  }

  // Or simpler: use Auth API
  // ⚠️ Supabase free tier may not let you query all users via Auth
  // Ideally store email in preferences during sign-up

  // Send to each email
  for (const email of emails) {
    await resend.emails.send({
      from: 'CultureRadar <onboarding@resend.dev>',
      to: email,
      subject: '🔥 Your Culture Digest for Today',
      html: `
        <div style="font-family: sans-serif;">
          <h2>📬 Trending Today</h2>
          <ul>
            <li>TikTok: New NPC remix trending</li>
            <li>Reddit: “Reverse Uno” meme comeback</li>
            <li>AI Tools: “AutoVid AI” launch</li>
          </ul>
        </div>
      `,
    });
  }

  return NextResponse.json({ success: true, sent: emails.length });
}
