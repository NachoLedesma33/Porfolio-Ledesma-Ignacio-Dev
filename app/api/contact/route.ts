import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
};

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isValidEmail(email: string): boolean {
  // Intentionally simple: we only need to reject obvious invalid input.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore: Map<string, number[]> = new Map();

function rateLimitCheck(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const existing = rateLimitStore.get(key) ?? [];
  const fresh = existing.filter(ts => ts > windowStart);
  fresh.push(now);
  rateLimitStore.set(key, fresh);

  if (fresh.length <= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const oldest = fresh[0] ?? now;
  const retryAfterSeconds = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
  return { allowed: false, retryAfterSeconds };
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { ok: false, error: "Server misconfigured: RESEND_API_KEY missing" },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = rateLimitCheck(ip);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      }
    );
  }

  let payload: ContactPayload | null = null;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();
  const website = (payload.website ?? "").trim();

  // Honeypot: bots often fill hidden fields.
  if (website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  if (name.length < 2 || name.length > 80) {
    return Response.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 254) {
    return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 2000) {
    return Response.json({ ok: false, error: "Invalid message" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const to = process.env.CONTACT_TO_EMAIL?.trim() || "delivered@resend.dev";
  const from = process.env.CONTACT_FROM || "Acme <onboarding@resend.dev>";

  const subject = `Nuevo mensaje de contacto: ${name}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
      <h2 style="margin:0 0 12px 0;">Nuevo mensaje de contacto</h2>
      <p style="margin:0 0 8px 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:16px 0 8px 0;"><strong>Mensaje:</strong></p>
      <pre style="margin:0;white-space:pre-wrap;word-wrap:break-word;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(
        message
      )}</pre>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    replyTo: email,
    headers: {
      "X-Contact-Form": "portfolio-dev",
    },
  });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 502 });
  }

  return Response.json({ ok: true, id: data?.id }, { status: 200 });
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
