import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase-admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();

    const { 
      name, 
      email, 
      service_tier, 
      message, 
      price, 
      addons, 
      attachmentUrl, 
      attachmentName 
    } = data;

    // ── Generate project key ───────────────────────────────────────
    const uniqueId   = Math.random().toString(36).substring(2, 8).toUpperCase();
    const projectKey = `ARCAM-${uniqueId}`;
    const today      = new Date().toISOString().split('T')[0];
    const investmentStr = price ? `₹${Number(price).toLocaleString('en-IN')}` : 'TBD';

    // ── Save client to Firestore ───────────────────────────────────
    const newClient = {
      clientName: name,
      email:      email,
      projectKey: projectKey,
      projectDetails: {
        name:       `${name}'s Project`,
        tier:       service_tier || 'Custom Inquiry',
        investment: investmentStr,
        startDate:  today,
        status:     'Pending Kick-off',
        addons:     addons || [],
        brief:      message,
        ...(attachmentUrl && { attachmentUrl, attachmentName }),
      },
      updates: [
        {
          id:      Date.now(),
          date:    today,
          message: `Inquiry received. Awaiting kickoff. Your project key is ${projectKey}.`,
          sender:  'System',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    const clientRef = db.collection('clients').doc();
    await clientRef.set(newClient);

    // ── Send emails via Resend ─────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const from        = process.env.RESEND_FROM_EMAIL || 'Arcam <onboarding@resend.dev>';
      const notifyEmail = process.env.RESEND_NOTIFY_EMAIL;

      // 1. Client confirmation
      await resend.emails.send({
        from,
        to: [email],
        subject: `Your Arcam Inquiry is Confirmed — ${projectKey}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;">
              <tr><td style="background:#E7B366;padding:6px 32px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.4em;color:#000;text-transform:uppercase;">Arcam — Client Advisory</p>
              </td></tr>
              <tr><td style="padding:40px 32px;">
                <h1 style="margin:0 0 8px;font-size:28px;font-weight:300;color:#ffffff;">Inquiry Confirmed</h1>
                <p style="margin:0 0 32px;color:#888888;font-size:14px;">Hello ${name}, your inquiry has been received and is under review.</p>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:12px;padding:24px;margin-bottom:24px;">
                  <tr><td>
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.3em;color:#E7B366;text-transform:uppercase;">Your Project Key</p>
                    <p style="margin:0;font-size:28px;font-weight:600;letter-spacing:0.2em;color:#ffffff;font-family:monospace;">${projectKey}</p>
                    <p style="margin:8px 0 0;font-size:12px;color:#555555;">Use this key to track your project on our client portal.</p>
                  </td></tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                  ${service_tier ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1F1F1F;"><span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:0.15em;">Package</span></td><td style="padding:8px 0;border-bottom:1px solid #1F1F1F;text-align:right;font-size:13px;color:#ccc;">${service_tier}</td></tr>` : ''}
                  ${price ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1F1F1F;"><span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:0.15em;">Investment</span></td><td style="padding:8px 0;border-bottom:1px solid #1F1F1F;text-align:right;font-size:13px;color:#ccc;">${investmentStr}</td></tr>` : ''}
                  <tr><td style="padding:8px 0;"><span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:0.15em;">Date</span></td><td style="padding:8px 0;text-align:right;font-size:13px;color:#ccc;">${today}</td></tr>
                </table>

                <p style="margin:0 0 24px;font-size:13px;color:#666666;line-height:1.7;">Our advisory team will review your brief and reach out within 24–48 hours to schedule a discovery call.</p>
                <p style="margin:0;font-size:12px;color:#444444;">— The Arcam Team</p>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      });

      // 2. Admin notification
      if (notifyEmail) {
        await resend.emails.send({
          from,
          to: [notifyEmail],
          subject: `New Inquiry: ${name} — ${service_tier || 'Custom'} (${projectKey})`,
          html: `
            <div style="font-family:monospace;background:#0A0A0A;color:#E7B366;padding:24px;border-radius:8px;max-width:520px;">
              <h2 style="margin:0 0 16px;color:#ffffff;">New Arcam Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Package:</strong> ${service_tier || 'Not specified'}</p>
              <p><strong>Investment:</strong> ${investmentStr}</p>
              <p><strong>Project Key:</strong> ${projectKey}</p>
              <p><strong>Add-ons:</strong> ${addons?.join(', ') || 'None'}</p>
              ${attachmentUrl ? `<p><strong>Attachment:</strong> <a href="${attachmentUrl}" style="color:#E7B366;">${attachmentName}</a></p>` : ''}
              <hr style="border-color:#222;margin:16px 0;"/>
              <p><strong>Brief:</strong><br/>${message}</p>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ success: true, projectKey, attachmentUrl });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
