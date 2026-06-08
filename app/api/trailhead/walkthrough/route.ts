import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { upsertAttioContact } from '@/lib/attio'

const SOURCE = 'trailhead-walkthrough'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body as Record<string, unknown>)?.email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const videoUrl = process.env.TRAILHEAD_WALKTHROUGH_VIDEO_URL ?? ''

  // Write to Attio — non-fatal
  try {
    await upsertAttioContact(normalizedEmail, SOURCE)
  } catch (err) {
    console.error('[walkthrough] attio error:', err)
  }

  // Send walkthrough link to submitter — non-fatal
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = process.env.RESEND_FROM_EMAIL ?? 'Off-Map <hello@off-map.com>'

    try {
      await resend.emails.send({
        from,
        to: normalizedEmail,
        subject: 'Your Trailhead walkthrough is ready — Off-Map',
        html: walkthroughEmailHtml(videoUrl),
      })
    } catch (err) {
      console.error('[walkthrough] resend submitter error:', err)
    }

    // Notify Brent — non-fatal, low-effort flag
    const notifyEmail = process.env.WALKTHROUGH_NOTIFY_EMAIL
    if (notifyEmail) {
      try {
        await resend.emails.send({
          from,
          to: notifyEmail,
          subject: `New walkthrough submission — ${normalizedEmail}`,
          html: `<p>New walkthrough gate submission.</p><p><strong>Email:</strong> ${normalizedEmail}</p><p><strong>Source:</strong> ${SOURCE}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`,
        })
      } catch (err) {
        console.error('[walkthrough] resend notify error:', err)
      }
    }
  }

  return NextResponse.json({ videoUrl }, { status: 200 })
}

function walkthroughEmailHtml(videoUrl: string): string {
  const linkLine = videoUrl
    ? `<p>Watch it here: <a href="${videoUrl}">${videoUrl}</a></p>`
    : `<p>We will send you the direct link shortly.</p>`

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;color:#1a1a1a;max-width:520px;margin:0 auto;padding:32px 16px;">
  <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#888;margin-bottom:24px;">
    Off-Map
  </p>
  <h1 style="font-size:22px;font-weight:700;margin-bottom:12px;">
    Your Trailhead walkthrough is ready.
  </h1>
  <p style="font-size:14px;line-height:1.6;color:#444;margin-bottom:16px;">
    Here is the 5-minute recorded walkthrough showing how Trailhead qualifies prospects,
    flags complexity, and delivers a clean attorney handoff.
  </p>
  ${linkLine}
  <p style="font-size:14px;line-height:1.6;color:#444;margin-top:24px;">
    If you have questions or want to discuss what a deployment would look like for your firm,
    <a href="https://off-map.com/book?source=trailhead-walkthrough-email">book a 30-minute call</a>.
  </p>
  <p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #e5e5e5;padding-top:16px;">
    Off-Map helps law firms run their practice. Not how they practice law.
  </p>
</body>
</html>`
}
