// Supabase Edge Function: send-contact-email
//
// Deploy from your machine (this function is NOT deployed by Lovable):
//   supabase functions deploy send-contact-email --no-verify-jwt
//
// Required secrets (already in your Edge Function Secrets):
//   SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD
// Optional:
//   CONTACT_TO_EMAIL   (defaults to ayshirozario5000@gmail.com)
//   CONTACT_FROM_EMAIL (defaults to SMTP_USERNAME)
//   ALLOWED_ORIGIN     (defaults to "*")

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OWNER_NAME = "Anona Ayshi Rozario";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 1 || name.length > 120) return json({ error: "Please provide your name." }, 400);
  if (!EMAIL_RE.test(email) || email.length > 200)
    return json({ error: "Please provide a valid email address." }, 400);
  if (message.length < 5 || message.length > 5000)
    return json({ error: "Please provide a message between 5 and 5000 characters." }, 400);

  const hostname = Deno.env.get("SMTP_SERVER");
  const port = Number(Deno.env.get("SMTP_PORT") ?? "465");
  const username = Deno.env.get("SMTP_USERNAME");
  const password = Deno.env.get("SMTP_PASSWORD");

  if (!hostname || !username || !password) {
    console.error("Missing SMTP configuration secrets");
    return json({ error: "Email service is not configured." }, 500);
  }

  const from = Deno.env.get("CONTACT_FROM_EMAIL") ?? username;
  const to = Deno.env.get("CONTACT_TO_EMAIL") ?? "ayshirozario5000@gmail.com";

  // Port 465 = implicit TLS. 587/25 = STARTTLS.
  const client = new SMTPClient({
    connection: {
      hostname,
      port,
      tls: port === 465,
      auth: { username, password },
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    // 1. Notification to the portfolio owner
    await client.send({
      from: `${OWNER_NAME} Portfolio <${from}>`,
      to,
      replyTo: email,
      subject: `New portfolio enquiry from ${name}`,
      content: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0b1120;line-height:1.6">
          <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
          <p style="margin:0 0 6px"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${safeEmail}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
          <p style="margin:0">${safeMessage}</p>
        </div>`,
    });

    // 2. Acknowledgment back to the sender
    await client.send({
      from: `${OWNER_NAME} <${from}>`,
      to: email,
      replyTo: to,
      subject: "Thanks for reaching out — I've received your message",
      content:
        `Hi ${name},\n\n` +
        `Thank you for getting in touch through my portfolio. I've received your message and will reply personally, usually within one business day.\n\n` +
        `For reference, here is what you sent:\n\n${message}\n\n` +
        `Best regards,\n${OWNER_NAME}\nSoftware Quality Assurance Engineer\n${to}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0b1120;line-height:1.6;max-width:560px">
          <h2 style="margin:0 0 16px">Thanks for reaching out, ${safeName}</h2>
          <p style="margin:0 0 12px">
            I've received your message through my portfolio and will reply personally,
            usually within one business day.
          </p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:20px 0">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b">Your message</p>
            <p style="margin:0">${safeMessage}</p>
          </div>
          <p style="margin:0 0 4px">Best regards,</p>
          <p style="margin:0"><strong>${OWNER_NAME}</strong><br />
            <span style="color:#64748b">Software Quality Assurance Engineer</span><br />
            <a href="mailto:${to}" style="color:#0f766e">${to}</a>
          </p>
        </div>`,
    });

    return json({ ok: true });
  } catch (error) {
    console.error("SMTP send failed:", error);
    return json({ error: "Could not send your message. Please email me directly." }, 502);
  } finally {
    try {
      await client.close();
    } catch {
      // ignore close errors
    }
  }
});
