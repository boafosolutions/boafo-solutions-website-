import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  Users,
  CreditCard,
  Leaf,
  Building2,
  Headphones,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AiSummary, BOAFO_INDUSTRIES, BOAFO_LOCATION, BOAFO_CONTACT } from "@/components/AiSummary";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Custom Software Developers | Boafo Solutions" },
      {
        name: "description",
        content:
          "Custom software developers — role-based portals, M-Pesa & Daraja integration, property management software, IoT telemetry, and management reporting.",
      },
      {
        name: "keywords",
        content:
          "Custom software developers, Web portal developers, M-Pesa integration, Daraja API developers, Property management software, SACCO software, IoT developers, Business automation, Boafo Solutions",
      },
      { property: "og:title", content: "Services — Boafo Solutions" },
      {
        property: "og:description",
        content:
          "Role-based portals, M-Pesa integration, property management software, IoT telemetry, and reporting.",
      },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.boafosolutions.com/services" },
      { property: "og:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
    ],
    links: [{ rel: "canonical", href: "https://www.boafosolutions.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.boafosolutions.com/" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://www.boafosolutions.com/services" },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Boafo Solutions — Services",
              url: "https://www.boafosolutions.com/services",
              provider: { "@id": "https://www.boafosolutions.com/#organization" },
              itemListElement: [
                { "@type": "Service", name: "Role-Based Access Platforms", description: "Multi-tenant RBAC web portals with row-level isolation, audit trails, and SSO for field, finance, and executive teams.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                { "@type": "Service", name: "M-Pesa & Daraja API Integration", description: "Safaricom Daraja C2B, STK Push, and B2C integration with automatic invoice matching and ERP sync.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                { "@type": "Service", name: "Property Management Software", description: "Rent automation, tenant self-service, M-Pesa receipts, and live portfolio dashboards.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                { "@type": "Service", name: "IoT Telemetry & Smart Meters", description: "Unified telemetry pipeline for solar inverters and smart meters with prepaid M-Pesa token vending.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                { "@type": "Service", name: "Customer Self-Service Portals", description: "24/7 portals for statements, requests, and account management.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                { "@type": "Service", name: "Management Reporting & Analytics", description: "Automated dashboards that surface revenue leakage and operational risk in real time.", areaServed: "KE", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "What does Boafo Solutions build?", acceptedAnswer: { "@type": "Answer", text: "Custom web portals, M-Pesa / Daraja API integrations, property management software, IoT telemetry pipelines, and automated reporting dashboards for enterprises in Kenya and across Africa." } },
                { "@type": "Question", name: "Do you integrate Safaricom M-Pesa (Daraja)?", acceptedAnswer: { "@type": "Answer", text: "Yes — Daraja C2B, STK Push, and B2C disbursements with automatic invoice matching, branded SMS/WhatsApp receipts, and ERP / Xero / QuickBooks sync." } },
                { "@type": "Question", name: "Who owns the source code at the end of a project?", acceptedAnswer: { "@type": "Answer", text: "You do. Every Boafo engagement delivers full source ownership at launch, with documentation and a complete handover." } },
                { "@type": "Question", name: "Do you support the software after launch?", acceptedAnswer: { "@type": "Answer", text: "Yes — every system ships with continuous server monitoring, proactive maintenance, and dedicated lifecycle support." } },
                { "@type": "Question", name: "Which industries do you serve?", acceptedAnswer: { "@type": "Answer", text: "Real estate, SACCOs and cooperatives, solar and utilities, logistics, retail and fintech, and professional services." } },
                { "@type": "Question", name: "How long does a typical project take?", acceptedAnswer: { "@type": "Answer", text: "Most engagements reach first production launch in under 8 weeks, delivered in two-week iterations with live demos and a fixed-price scope." } },
                { "@type": "Question", name: "Do you build mobile apps?", acceptedAnswer: { "@type": "Answer", text: "Yes — installable PWAs and native React Native apps for iOS and Android, typically wired to the same role-based backend as the web portal." } },
                { "@type": "Question", name: "Can you integrate with our ERP / accounting system?", acceptedAnswer: { "@type": "Answer", text: "Yes. We integrate with Xero, QuickBooks, SAP, Odoo, and custom ERPs via REST, webhooks, and direct database connectors." } },
                { "@type": "Question", name: "Is the software hosted by Boafo or by us?", acceptedAnswer: { "@type": "Answer", text: "Your cloud, your data. We deploy to your AWS, Cloudflare, or GCP account so you retain full ownership and control." } },
                { "@type": "Question", name: "What does a 30-minute architecture discovery include?", acceptedAnswer: { "@type": "Answer", text: "A senior engineer maps your primary bottleneck, key integrations, and the cost of doing nothing — then sends a one-page technical brief with a recommended next step." } },
                { "@type": "Question", name: "Do you offer fixed pricing?", acceptedAnswer: { "@type": "Answer", text: "Yes. After the blueprint phase we commit to a fixed-price scope per milestone, with predictable monthly operations after launch." } },
                { "@type": "Question", name: "Where is Boafo Solutions based?", acceptedAnswer: { "@type": "Answer", text: "Ngong 5th Avenue, Upperhill, Nairobi, Kenya — with a remote-first delivery model across East Africa and global time zones." } },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.05, duration: 0.65, ease: EASE },
  }),
};

const SERVICES = [
  {
    icon: Users,
    title: "Role-Based Access Platforms",
    summary:
      "Granular RBAC portals where field agents, accountants, and executives each see exactly what they need — and nothing else.",
    points: [
      "Row-level isolation by tenant, branch, or role",
      "Full audit trail on every action",
      "Single sign-on (Google Workspace, Microsoft 365)",
      "Mobile-first PWA for field teams",
    ],
  },
  {
    icon: CreditCard,
    title: "M-Pesa & API Workflow Choreography",
    summary:
      "We plug Safaricom Daraja straight into your ledger. Payments match invoices, customers get branded receipts, and your books close in real time.",
    points: [
      "Daraja C2B, STK Push, B2C disbursements",
      "Automatic invoice matching (>99% accuracy)",
      "SMS + WhatsApp receipts",
      "ERP / Xero / QuickBooks sync",
    ],
  },
  {
    icon: Leaf,
    title: "Green Energy & Smart Asset Infrastructure",
    summary:
      "Unified telemetry pipeline for solar inverters, smart meters, and IoT sensors — with prepaid token vending built in.",
    points: [
      "MQTT / HTTP ingestion from any brand",
      "Prepaid token vending via M-Pesa",
      "Live consumption map for CFOs",
      "Anomaly alerts to engineers' phones",
    ],
  },
  {
    icon: Building2,
    title: "Advanced Property Management Software",
    summary:
      "Turnkey real estate platform: prorated rent, STK payments, tenant self-service, and a board-ready dashboard.",
    points: [
      "Tenant statements & receipts on autopilot",
      "Caretaker console for maintenance tickets",
      "Occupancy, arrears, and yield in one view",
      "Multi-block, multi-landlord ready",
    ],
  },
  {
    icon: Headphones,
    title: "Customer Self-Service Portals",
    summary:
      "Give your clients a clean, branded portal to manage accounts, raise tickets, and download documents — 24/7.",
    points: [
      "Branded login with your domain",
      "Document vault & secure messaging",
      "Self-service updates reduce support load",
      "API-ready for downstream systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Management Reporting & Analytics",
    summary:
      "Live, structured dashboards that turn raw operational data into decisions your CFO will actually open on Monday.",
    points: [
      "Daily auto-emailed exec briefs",
      "Drill-down from KPI to transaction",
      "Custom export to Excel / Google Sheets",
      "Anomaly detection on revenue lines",
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main className="pt-32 sm:pt-36">
        <AiSummary
          title="Boafo Solutions — Services"
          summary="Six production-grade service lines for the modern enterprise: role-based access platforms, M-Pesa & Daraja API integration, property management software, IoT telemetry & smart meters, customer self-service portals, and management reporting & analytics."
          services={SERVICES.map((s) => s.title)}
          industries={BOAFO_INDUSTRIES}
          location={BOAFO_LOCATION}
          contact={BOAFO_CONTACT}
        />
        <section className="relative overflow-hidden pb-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-mono uppercase tracking-widest text-primary">
              Services
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              The full <span className="text-gradient">Boafo capability stack.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
            >
              Full-stack portal development company — we build, integrate,
              and support every layer of your operational software, from M-Pesa
              callbacks to executive dashboards.
            </motion.p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <motion.article
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                whileHover={{ y: -5, transition: { duration: 0.35, ease: EASE } }}
                className="solid-card group relative overflow-hidden p-7"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-primary/10 text-primary"
                >
                  <s.icon className="h-5 w-5" />
                </motion.div>
                <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          {/* ───── SEO long-form content ───── */}
          <section className="mx-auto mt-20 max-w-4xl px-5 sm:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-primary">
                How we deliver
              </p>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                A delivery model built for <span className="text-gradient">operational software.</span>
              </h2>
            </div>

            <div className="prose prose-sm sm:prose-base max-w-none space-y-5 text-muted-foreground [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:tracking-tight [&_strong]:text-foreground">
              <h3 className="text-lg sm:text-xl">Custom software developers for high-stakes workflows</h3>
              <p>
                Boafo Solutions is a Nairobi-based team of <strong>custom software developers</strong> and
                <strong> web portal developers</strong> serving SACCOs, property managers, energy operators,
                logistics networks, and enterprise finance teams across Kenya and East Africa. Every engagement
                starts with a senior engineer mapping the real bottleneck — reconciliation drift, manual
                rent ledgers, scattered telemetry, fragmented reporting — and ends with production software
                your team actually uses on Monday morning.
              </p>

              <h3 className="text-lg sm:text-xl">M-Pesa, Daraja, and payment integration done properly</h3>
              <p>
                Our <strong>M-Pesa integration</strong> and <strong>Daraja API</strong> work covers C2B, STK
                Push, B2C disbursements, and reversals — wired directly into your general ledger with
                automatic invoice matching, branded SMS receipts, and WhatsApp confirmations. We handle the
                edge cases most teams ignore: duplicate callbacks, partial payments, refund flows, and
                multi-tenant Paybill splits. The result is a closed-loop payment system where finance
                stops reconciling spreadsheets and starts publishing real numbers.
              </p>

              <h3 className="text-lg sm:text-xl">Property management software and tenant portals</h3>
              <p>
                Our <strong>property management software</strong> covers prorated billing, STK-push rent
                collection, automatic statements, caretaker workflows, and an executive dashboard for
                occupancy, arrears, and yield. It is multi-block, multi-landlord ready, and integrates
                cleanly with the rest of your finance stack so the board sees a single source of truth.
              </p>

              <h3 className="text-lg sm:text-xl">IoT telemetry, SACCO platforms, and business automation</h3>
              <p>
                We unify telemetry from solar inverters, smart meters, and IoT sensors into one operational
                feed — with prepaid token vending, anomaly alerts, and live consumption maps. For SACCOs and
                cooperatives, we build member portals, loan workflows, and audit-ready ledgers. Across every
                domain, our <strong>business automation</strong> engagements share the same backbone:
                role-based access control, full audit trails, single sign-on, and APIs that downstream
                teams can build on without filing a ticket.
              </p>

              <h3 className="text-lg sm:text-xl">Fixed-price scope, full source ownership, ongoing support</h3>
              <p>
                We deliver on fixed-price milestones, transfer full source ownership at launch, and provide
                ongoing support, monitoring, and feature improvements after go-live. If you are evaluating
                <strong> custom software developers</strong> or a <strong>portal development company</strong>{" "}
                for a critical operational platform, the fastest next step is a 30-minute architecture
                discovery with a senior engineer.
              </p>
            </div>
          </section>

          <div className="mx-auto mt-12 max-w-4xl px-5 text-center sm:px-8">
            <Link
              to="/contact"
              className="btn-mint inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Scope your system
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
