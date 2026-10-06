import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DEFAULT_CONTACT_TO_EMAIL = "boafosolutions@outlook.com";
const EmailAddressSchema = z.string().trim().email();

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().min(1, "Company required").max(150),
  email: z.string().trim().email("Valid email required").max(200),
  phone: z.string()
    .trim()
    .min(1, "Phone required")
    .max(30, "Phone number too long")
    .refine((s) => s.replace(/\D/g, "").length >= 7, "Enter a complete phone number with at least 7 digits"),
  bottleneck: z.string().trim().min(1, "Pick a bottleneck").max(80),
  message: z.string().trim().max(2000).optional().default(""),
});

export const sendContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const internalRecipients = getInternalRecipients(process.env.CONTACT_TO_EMAIL);
    const primaryInternalRecipient = internalRecipients[0] ?? DEFAULT_CONTACT_TO_EMAIL;
    const fromEnv = process.env.RESEND_FROM_EMAIL;
    // Resend requires a verified domain to send any email — there is no usable test mode with an API key.
    const from = fromEnv ?? "Boafo Solutions <onboarding@resend.dev>";
    const hasVerifiedDomain = Boolean(fromEnv);
    const siteUrl = process.env.SITE_URL ?? "https://boafosolutions.com";
    const logoUrl = `${siteUrl}/boafo-logo-light.svg`;
    const bookingUrl = `${siteUrl}/contact#book`;

    // Always log the submission server-side so it's never lost, even if email delivery isn't configured.
    console.log("[contact] submission", {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      bottleneck: data.bottleneck,
      message: data.message,
    });

    if (!apiKey || !hasVerifiedDomain) {
      console.warn(
        "[contact] Email skipped — set RESEND_FROM_EMAIL to a verified Resend domain to enable delivery.",
        { hasApiKey: !!apiKey, hasVerifiedDomain },
      );
      return {
        ok: true,
        delivered: false as const,
        message: "Thanks — your request was received. We'll be in touch within one business day.",
      };
    }

    const internalSubject = `New architecture discovery — ${data.company}`;
    const internalHtml = renderInternalEmail({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      bottleneck: data.bottleneck,
      message: data.message,
      logoUrl,
    });
    const confirmSubject = `We received your request — Boafo Solutions`;
    const confirmHtml = renderConfirmationEmail({
      name: data.name,
      company: data.company,
      bottleneck: data.bottleneck,
      logoUrl,
      bookingUrl,
    });

    async function send(payload: Record<string, unknown>) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) console.error("[contact] Resend failed", res.status, text);
      else console.log("[contact] Resend ok", text);
      return { ok: res.ok, text };
    }

    try {
      const [internal, confirm] = await Promise.all([
        send({ from, to: internalRecipients, subject: internalSubject, html: internalHtml, reply_to: data.email }),
        send({ from, to: [data.email], subject: confirmSubject, html: confirmHtml, reply_to: primaryInternalRecipient }),
      ]);

      if (!internal.ok && !confirm.ok) {
        return {
          ok: true,
          delivered: false as const,
          message: "Thanks — your request was received. We'll be in touch within one business day.",
        };
      }

      return {
        ok: true,
        delivered: true as const,
        message: "Request received — check your inbox for a confirmation. We'll be in touch within one business day.",
      };
    } catch (err) {
      console.error("[contact] Resend threw", err);
      return {
        ok: true,
        delivered: false as const,
        message: "Thanks — your request was received. We'll be in touch within one business day.",
      };
    }
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getInternalRecipients(raw?: string) {
  const recipients = (raw ?? DEFAULT_CONTACT_TO_EMAIL)
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter((email) => EmailAddressSchema.safeParse(email).success);

  return recipients.length > 0 ? recipients : [DEFAULT_CONTACT_TO_EMAIL];
}

function renderConfirmationEmail(opts: {
  name: string;
  company: string;
  bottleneck: string;
  logoUrl: string;
  bookingUrl: string;
}) {
  const { name, company, bottleneck, logoUrl, bookingUrl } = opts;
  const firstName = escapeHtml(name.split(" ")[0] || name);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Boafo Solutions</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">We received your request — a senior engineer will be in touch within one business day.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:linear-gradient(135deg,#0b1220 0%,#0f172a 100%);padding:24px 28px;">
                <img src="${logoUrl}" alt="Boafo Solutions" height="28" style="display:block;height:28px;width:auto;border:0;outline:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 8px;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0891b2;font-weight:600;">Request received</p>
                <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:#0f172a;font-weight:700;">Thanks, ${firstName}.</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#334155;">
                  A senior engineer at <strong style="color:#0f172a;">Boafo Solutions</strong> will reach out within one business day to schedule your 30-minute architecture discovery — no pitch, just a clear plan.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                  <tr><td style="padding:14px 16px;font-size:13px;color:#475569;">
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Company</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(company)}</strong></div>
                    <div><span style="color:#64748b;">Bottleneck</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(bottleneck)}</strong></div>
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 28px 8px;">
                <a href="${bookingUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;">
                  Book a time now →
                </a>
                <div style="margin-top:10px;font-size:12px;color:#64748b;">Prefer instant? WhatsApp <a href="https://wa.me/254737575156" style="color:#0891b2;text-decoration:none;">0737 575 156</a></div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 26px;border-top:1px solid #e2e8f0;background:#fafbfc;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;line-height:1.6;color:#64748b;">
                      <strong style="color:#0f172a;">Boafo Solutions</strong><br/>
                      Ngong 5th Ave, Upperhill · Nairobi, Kenya<br/>
                      <a href="mailto:info@boafosolutions.com" style="color:#0891b2;text-decoration:none;">info@boafosolutions.com</a> · <a href="https://boafosolutions.com" style="color:#0891b2;text-decoration:none;">boafosolutions.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="max-width:560px;margin:14px auto 0;font-size:11px;color:#94a3b8;text-align:center;">
            You received this because you submitted a request at boafosolutions.com.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderInternalEmail(opts: {
  name: string;
  company: string;
  email: string;
  phone: string;
  bottleneck: string;
  message: string;
  logoUrl: string;
}) {
  const { name, company, email, phone, bottleneck, message, logoUrl } = opts;
  const digits = phone.replace(/\D/g, "");
  let waNumber = digits;
  if (waNumber.startsWith("0") && waNumber.length === 10) {
    waNumber = "254" + waNumber.slice(1);
  } else if (waNumber.startsWith("7") && waNumber.length === 9) {
    waNumber = "254" + waNumber;
  } else if (!(waNumber.startsWith("254") && waNumber.length === 12)) {
    waNumber = "";
  }
  const whatsappButton = waNumber
    ? `<a href="https://wa.me/${waNumber}" style="display:inline-block;margin-left:10px;background:#ffffff;color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;border:1px solid #e2e8f0;">
        WhatsApp →
      </a>`
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New discovery request — Boafo Solutions</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New architecture discovery request from ${escapeHtml(name)} at ${escapeHtml(company)}.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:linear-gradient(135deg,#0b1220 0%,#0f172a 100%);padding:24px 28px;">
                <img src="${logoUrl}" alt="Boafo Solutions" height="28" style="display:block;height:28px;width:auto;border:0;outline:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 8px;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0891b2;font-weight:600;">New discovery request</p>
                <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:#0f172a;font-weight:700;">${escapeHtml(name)} · ${escapeHtml(company)}</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#334155;">
                  A new architecture discovery request has been submitted via the website. Reply by email or WhatsApp below.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                  <tr><td style="padding:14px 16px;font-size:13px;line-height:1.6;color:#475569;">
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Name</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(name)}</strong></div>
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Company</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(company)}</strong></div>
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Email</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(email)}</strong></div>
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Phone</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(phone)}</strong></div>
                    <div style="margin-bottom:6px;"><span style="color:#64748b;">Bottleneck</span> &nbsp; <strong style="color:#0f172a;">${escapeHtml(bottleneck)}</strong></div>
                    ${message ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;"><span style="color:#64748b;">Notes</span><br/><strong style="color:#0f172a;">${escapeHtml(message).replace(/\n/g, "<br/>")}</strong></div>` : ""}
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 28px 8px;">
                <a href="mailto:${email}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;">
                  Reply by email →
                </a>
                ${whatsappButton}
                <div style="margin-top:10px;font-size:12px;color:#64748b;">Submitted via boafosolutions.com/contact</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 26px;border-top:1px solid #e2e8f0;background:#fafbfc;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;line-height:1.6;color:#64748b;">
                      <strong style="color:#0f172a;">Boafo Solutions</strong><br/>
                      Ngong 5th Ave, Upperhill · Nairobi, Kenya<br/>
                      <a href="mailto:info@boafosolutions.com" style="color:#0891b2;text-decoration:none;">info@boafosolutions.com</a> · <a href="https://boafosolutions.com" style="color:#0891b2;text-decoration:none;">boafosolutions.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="max-width:560px;margin:14px auto 0;font-size:11px;color:#94a3b8;text-align:center;">
            Internal notification · Boafo Solutions contact form
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
