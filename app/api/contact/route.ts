import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'cyubahirontwaliadore@gmail.com';

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Email service is not currently configured on the server. Please reach out directly via email.',
          unconfigured: true,
        },
        { status: 503 },
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Please fill in all required fields (Name, Email, Message).' }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipientEmail,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e5e5e5;padding:32px;border-radius:12px;border:1px solid #30363d;">
          <h2 style="color:#5df7c1;margin-top:0;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Reply-to:</strong> <a href="mailto:${email}" style="color:#00d6ff;">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <hr style="border:none;border-top:1px solid #21262d;margin:20px 0;"/>
          <p style="white-space:pre-wrap;line-height:1.7;color:#c9d1d9;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend delivery error:', error);
      return NextResponse.json({ error: error.message || 'Email delivery failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
