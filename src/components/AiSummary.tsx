/**
 * AiSummary — a hidden-but-crawlable semantic summary block for LLMs
 * and search engines. Rendered server-side (via TanStack Start SSR) so
 * it ships in the initial HTML; visually hidden via the `sr-only`
 * pattern so the design is unaffected. Use one per route, immediately
 * inside <main>, before the visual hero.
 */
import type { ReactNode } from "react";

interface AiSummaryProps {
  title: string;
  summary: string;
  services?: string[];
  industries?: string[];
  location?: string;
  contact?: { email?: string; phone?: string };
  faqs?: { q: string; a: string }[];
  children?: ReactNode;
}

const SR_ONLY: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function AiSummary({
  title,
  summary,
  services,
  industries,
  location,
  contact,
  faqs,
  children,
}: AiSummaryProps) {
  return (
    <section aria-label="Summary" style={SR_ONLY}>
      <h2>{title}</h2>
      <p>{summary}</p>
      {services && services.length > 0 && (
        <>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {industries && industries.length > 0 && (
        <>
          <h3>Industries served</h3>
          <ul>
            {industries.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {location && (
        <>
          <h3>Primary location</h3>
          <p>{location}</p>
        </>
      )}
      {contact && (
        <>
          <h3>Contact</h3>
          <ul>
            {contact.email && (
              <li>
                Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
            {contact.phone && (
              <li>
                Phone / WhatsApp:{" "}
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
              </li>
            )}
          </ul>
        </>
      )}
      {faqs && faqs.length > 0 && (
        <>
          <h3>Frequently asked questions</h3>
          <dl>
            {faqs.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {children}
    </section>
  );
}

export const BOAFO_CORE_SERVICES = [
  "Custom software development",
  "Web portal development (role-based, multi-tenant)",
  "M-Pesa integration & Safaricom Daraja API (C2B, STK Push, B2C)",
  "Property management software",
  "IoT telemetry & smart-meter / prepaid token vending",
  "Business automation, reporting dashboards, ERP/Xero/QuickBooks sync",
  "SACCO and fintech back-office systems",
  "Customer self-service portals",
];

export const BOAFO_INDUSTRIES = [
  "Real estate & property management",
  "SACCOs & cooperatives",
  "Solar, utilities & green energy",
  "Logistics & distribution",
  "Retail & fintech",
  "Professional services",
];

export const BOAFO_LOCATION =
  "Ngong 5th Avenue, Upperhill, Nairobi, Kenya — serving Kenya, East Africa, and global clients.";

export const BOAFO_CONTACT = {
  email: "info@boafosolutions.com",
  phone: "+254 737 575 156",
};
