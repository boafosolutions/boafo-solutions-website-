import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AiSummary, BOAFO_INDUSTRIES, BOAFO_LOCATION, BOAFO_CONTACT } from "@/components/AiSummary";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Business Automation Case Studies | Boafo Solutions" },
      {
        name: "description",
        content:
          "Case studies from Boafo Solutions — M-Pesa reconciliation, property management portals, IoT telemetry, and logistics dispatch built for enterprises.",
      },
      {
        name: "keywords",
        content:
          "Business automation software, M-Pesa reconciliation, Property management portal, IoT telemetry, Logistics dispatch software, SACCO automation, Boafo Solutions case studies",
      },
      { property: "og:title", content: "Work — Boafo Solutions" },
      {
        property: "og:description",
        content:
          "Business friction, eliminated. See the systems Boafo Solutions has shipped to production.",
      },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.boafosolutions.com/work" },
      { property: "og:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
    ],
    links: [{ rel: "canonical", href: "https://www.boafosolutions.com/work" }],
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
                { "@type": "ListItem", position: 2, name: "Work", item: "https://www.boafosolutions.com/work" },
              ],
            },
            {
              "@type": "CollectionPage",
              "@id": "https://www.boafosolutions.com/work#webpage",
              url: "https://www.boafosolutions.com/work",
              name: "Work — Boafo Solutions Case Studies",
              about: { "@id": "https://www.boafosolutions.com/#organization" },
              inLanguage: "en",
              hasPart: [
                { "@type": "CreativeWork", name: "Auto-reconciled M-Pesa ledger for a 12-branch SACCO", about: "M-Pesa reconciliation, SACCO" },
                { "@type": "CreativeWork", name: "Tenant self-service portal across 480 units", about: "Property management, STK push rent" },
                { "@type": "CreativeWork", name: "Unified IoT telemetry & prepaid token vending", about: "IoT, solar, smart meters" },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: WorkPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.05, duration: 0.65, ease: EASE },
  }),
};

const CASES = [
  {
    sector: "SACCO · Retail",
    title: "Auto-reconciled M-Pesa ledger for a 12-branch SACCO",
    body:
      "Replaced a WhatsApp + Excel reconciliation workflow with a Daraja-powered ledger. Every Paybill payment now matches to an invoice and posts to the GL in under 2 seconds.",
    metrics: [
      { label: "Leakage recovered", value: "KES 80k / mo" },
      { label: "Daily admin time", value: "3.5h → 0" },
      { label: "Match rate", value: "99.7%" },
    ],
  },
  {
    sector: "Real Estate",
    title: "Tenant self-service portal across 480 units",
    body:
      "Prorated billing, STK-push rent payments, automatic receipts, and a board dashboard for occupancy, arrears, and yield — replacing notebooks and shared Excel files.",
    metrics: [
      { label: "Late rent", value: "38% → 9%" },
      { label: "Disputes / mo", value: "22 → 2" },
      { label: "Report build", value: "7d → instant" },
    ],
  },
  {
    sector: "Solar / Utilities",
    title: "Unified IoT telemetry & prepaid token vending",
    body:
      "Combined three meter brands into one telemetry feed. Customers vend tokens via M-Pesa; the CFO sees live consumption across every site on one map.",
    metrics: [
      { label: "Meter errors", value: "12% → 0.3%" },
      { label: "Billing cycle", value: "30d → live" },
      { label: "Monthly site visits", value: "4 → 0" },
    ],
  },
  {
    sector: "Logistics",
    title: "Dispatch console for a 40-rider distribution network",
    body:
      "Lightweight Android PWA for riders, live dispatch console for HQ, and customer SMS with tracking links — plus auto-calculated commissions.",
    metrics: [
      { label: "Stock-outs / wk", value: "12 → 1" },
      { label: "ETA accuracy", value: "44% → 96%" },
      { label: "Commission reconciliation", value: "Daily → auto" },
    ],
  },
];

const STATS = [
  { icon: TrendingUp, value: "32+", label: "production systems shipped" },
  { icon: Users, value: "14", label: "enterprises served" },
  { icon: Clock, value: "<8wk", label: "average time to first launch" },
];

function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main className="pt-32 sm:pt-36">
        <AiSummary
          title="Boafo Solutions — Case Studies"
          summary="Selected production systems shipped by Boafo Solutions: M-Pesa reconciliation for a 12-branch SACCO, a tenant self-service portal across 480 units, unified IoT telemetry and prepaid token vending for solar utilities, and a dispatch console for a 40-rider logistics network."
          industries={BOAFO_INDUSTRIES}
          location={BOAFO_LOCATION}
          contact={BOAFO_CONTACT}
        />
        <section className="relative overflow-hidden pb-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-mono uppercase tracking-widest text-primary">
              Work · Case Studies
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Real systems. <span className="text-gradient">Real ROI.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
            >
              Snapshots from our custom software engagements — property
              management platforms, M-Pesa integrations, and IoT operators.
            </motion.p>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 px-5 sm:px-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="solid-card flex flex-col items-center gap-1.5 p-4 text-center"
              >
                <s.icon className="h-4 w-4 text-primary" />
                <p className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{s.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2">
            {CASES.map((c, i) => (
              <motion.article
                key={c.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                whileHover={{ y: -5, transition: { duration: 0.35, ease: EASE } }}
                className="solid-card relative overflow-hidden p-6 sm:p-7"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{c.sector}</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border bg-background/60 p-2.5">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.label}</p>
                      <p className="mt-0.5 text-sm font-bold text-primary">{m.value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* ───── SEO long-form content ───── */}
          <section className="mx-auto mt-20 max-w-4xl px-5 sm:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-primary">
                Engagement model
              </p>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                How Boafo Solutions ships <span className="text-gradient">production systems.</span>
              </h2>
            </div>

            <div className="prose prose-sm sm:prose-base max-w-none space-y-5 text-muted-foreground [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:tracking-tight [&_strong]:text-foreground">
              <h3 className="text-lg sm:text-xl">Case studies in business automation software</h3>
              <p>
                These case studies represent a snapshot of the <strong>business automation software</strong>{" "}
                Boafo Solutions has shipped to production for SACCOs, property managers, solar utilities, and
                logistics operators across Kenya and East Africa. Each engagement begins with a senior
                engineer auditing the real bottleneck — payment leakage, manual rent collection, fragmented
                telemetry, or unreliable dispatch — and ends with software your team uses every day, backed
                by clear metrics on the outcome.
              </p>

              <h3 className="text-lg sm:text-xl">M-Pesa reconciliation and Daraja-powered ledgers</h3>
              <p>
                Our <strong>M-Pesa reconciliation</strong> work uses the Safaricom Daraja API to match every
                C2B and STK payment against an invoice and post directly to the GL. For multi-branch SACCOs
                and retail networks we eliminate the WhatsApp-and-Excel reconciliation cycle, recover
                payment leakage, and close the books in real time. Reversals, duplicate callbacks, and
                partial payments are handled inside the engine — not in a finance team's inbox.
              </p>

              <h3 className="text-lg sm:text-xl">Property management portals and tenant self-service</h3>
              <p>
                Our <strong>property management portal</strong> engagements replace notebooks and shared
                spreadsheets with prorated billing, STK-push rent payments, automatic receipts, tenant
                self-service, and a board-ready dashboard for occupancy, arrears, and yield. The same
                platform scales from a single block to multi-landlord portfolios without rewriting the
                operational model.
              </p>

              <h3 className="text-lg sm:text-xl">IoT telemetry and logistics dispatch software</h3>
              <p>
                For solar and utility operators we deliver unified <strong>IoT telemetry</strong> across
                multi-brand smart meters, with prepaid token vending paid through M-Pesa and live
                consumption visible to the CFO on a single map. For distribution networks we build
                <strong> logistics dispatch software</strong> — a lightweight Android PWA for riders, a
                real-time dispatch console for HQ, customer SMS with tracking links, and auto-calculated
                rider commissions.
              </p>

              <h3 className="text-lg sm:text-xl">SACCO automation and enterprise-grade reliability</h3>
              <p>
                Our <strong>SACCO automation</strong> projects pair member portals and loan workflows with
                audit-ready ledgers and granular role-based access. Across every sector, the systems we
                ship share the same backbone: row-level tenant isolation, full audit trails, single sign-on,
                fixed-price scope, full source ownership at delivery, and ongoing support after launch.
                If your next operational platform needs the same outcomes — measurable ROI, lower
                operational drag, and software your team trusts — start with a 30-minute architecture
                discovery.
              </p>
            </div>
          </section>

          <div className="mx-auto mt-12 max-w-4xl px-5 text-center sm:px-8">
            <Link
              to="/contact"
              className="btn-mint inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Make yours next
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
