import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Users,
  LifeBuoy,
  Leaf,
  Building2,
  BarChart3,
  Headphones,
  Activity,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { LiveOperationsSimulator } from "@/components/LiveOperationsSimulator";
import { PerfBoundary } from "@/lib/perf-profiler";
import {
  AiSummary,
  BOAFO_CORE_SERVICES,
  BOAFO_INDUSTRIES,
  BOAFO_LOCATION,
  BOAFO_CONTACT,
} from "@/components/AiSummary";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boafo Solutions | Custom Software & Web Portal Developers" },
      {
        name: "description",
        content:
          "Boafo Solutions — custom software and web portal developers in Nairobi, Kenya. M-Pesa integration, business automation, and property management software for the modern enterprise.",
      },
      {
        name: "keywords",
        content:
          "Custom software developers, Web portal developers, M-Pesa integration, Daraja API, Business automation, Property management software, SACCO software, Boafo Solutions",
      },
      { property: "og:title", content: "Boafo Solutions | Custom Software & Web Portal Developers" },
      {
        property: "og:description",
        content:
          "Custom software, M-Pesa integration, and business automation for the modern enterprise.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.boafosolutions.com/" },
      { property: "og:site_name", content: "Boafo Solutions" },
      { property: "og:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
    ],
    links: [{ rel: "canonical", href: "https://www.boafosolutions.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://www.boafosolutions.com/#webpage",
              url: "https://www.boafosolutions.com/",
              name: "Boafo Solutions | Custom Software & Web Portal Developers",
              isPartOf: { "@id": "https://www.boafosolutions.com/#website" },
              about: { "@id": "https://www.boafosolutions.com/#organization" },
              primaryImageOfPage: { "@id": "https://www.boafosolutions.com/#logo" },
              inLanguage: "en",
              description:
                "Custom software, web portal development, and M-Pesa integration for the modern enterprise.",
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://www.boafosolutions.com/#service",
              name: "Boafo Solutions",
              url: "https://www.boafosolutions.com",
              parentOrganization: { "@id": "https://www.boafosolutions.com/#organization" },
              description:
                "Custom software, web portal development, and M-Pesa integration for the modern enterprise.",
              serviceType: [
                "Custom software development",
                "Web portal development",
                "M-Pesa API integration",
                "Property management software",
                "Business automation software",
              ],
              areaServed: ["KE", "Africa"],
              email: "info@boafosolutions.com",
              telephone: "+254737575156",
              provider: { "@id": "https://www.boafosolutions.com/#organization" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Boafo Solutions — Services",
                itemListElement: [
                  { "@type": "Service", name: "Custom software development", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                  { "@type": "Service", name: "Web portal development", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                  { "@type": "Service", name: "M-Pesa & Daraja API integration", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                  { "@type": "Service", name: "Property management software", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                  { "@type": "Service", name: "IoT telemetry & smart meters", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                  { "@type": "Service", name: "Business automation & reporting", provider: { "@id": "https://www.boafosolutions.com/#organization" } },
                ],
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.boafosolutions.com/" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "What does Boafo Solutions do?", acceptedAnswer: { "@type": "Answer", text: "Boafo Solutions is a custom software and web portal development company based in Nairobi, Kenya. We build M-Pesa / Daraja API integrations, property management software, IoT telemetry pipelines, SACCO platforms, and business automation systems for enterprises across Kenya and Africa." } },
                { "@type": "Question", name: "Where is Boafo Solutions located?", acceptedAnswer: { "@type": "Answer", text: "Boafo Solutions is headquartered at Ngong 5th Avenue, Upperhill, Nairobi, Kenya, and serves clients across East Africa and globally on a remote-first delivery model." } },
                { "@type": "Question", name: "Which industries does Boafo Solutions serve?", acceptedAnswer: { "@type": "Answer", text: "Real estate and property management, SACCOs and cooperatives, solar and utilities, logistics and distribution, retail and fintech, and professional services." } },
                { "@type": "Question", name: "How can I contact Boafo Solutions?", acceptedAnswer: { "@type": "Answer", text: "Email info@boafosolutions.com or call / WhatsApp +254 737 575 156. You can also book a 30-minute architecture discovery call from the Contact page." } },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <AiSummary
          title="Boafo Solutions — Custom Software & Web Portal Developers"
          summary="Boafo Solutions is a Nairobi-based custom software and web portal development company. We build M-Pesa / Safaricom Daraja API integrations, property management software, IoT telemetry, SACCO platforms, and business automation systems for enterprises across Kenya and Africa, with senior-only delivery, full source ownership, and lifetime support."
          services={BOAFO_CORE_SERVICES}
          industries={BOAFO_INDUSTRIES}
          location={BOAFO_LOCATION}
          contact={BOAFO_CONTACT}
          faqs={[
            { q: "What does Boafo Solutions do?", a: "We design, build, and operate custom web portals, M-Pesa integrations, property management software, IoT telemetry, and business automation systems for enterprises." },
            { q: "Where is Boafo Solutions located?", a: "Ngong 5th Avenue, Upperhill, Nairobi, Kenya — serving clients across Kenya, East Africa, and globally." },
            { q: "Which technologies does Boafo Solutions use?", a: "React, TanStack Start, TypeScript, Node.js, PostgreSQL, the Safaricom Daraja API, MQTT/HTTP telemetry pipelines, and cloud infrastructure on AWS and Cloudflare." },
            { q: "Why choose Boafo Solutions?", a: "Senior-only delivery, fixed-price scope, full source ownership at launch, audit-grade reporting, and lifetime support after go-live." },
          ]}
        />
        <PerfBoundary id="Hero"><Hero /></PerfBoundary>
        <PerfBoundary id="LiveOperations"><LiveOperationsSimulator /></PerfBoundary>
        <PerfBoundary id="Bento"><Bento /></PerfBoundary>
        <PerfBoundary id="Promise"><Promise /></PerfBoundary>
        <PerfBoundary id="FooterCTA"><FooterCTA /></PerfBoundary>
      </main>
      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-20 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-glow">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Engineered for the modern enterprise
          </div>

          <h1 className="mt-4 text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4rem]">
            We build great websites, custom webapps, and{" "}
            <span className="text-gradient">autonomous business engines.</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-[1.7] text-muted-foreground lg:text-lg">
            Corporate sites, secure platforms, and business automation that just works.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-7">
            <Link
              to="/contact"
              className="btn-mint group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="btn-outline group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <HeroTerminal />
      </div>
    </section>
  );
}

function HeroTerminal() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/0 to-primary/30 opacity-50 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* chrome */}
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated/60 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/40" />
            <span className="h-3 w-3 rounded-full bg-amber-400/40" />
            <span className="h-3 w-3 rounded-full bg-primary/60" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>core_engine.v3</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="inline-flex items-center gap-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="text-emerald-300"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                live
              </motion.span>
            </span>
          </div>
          <Activity className="h-3.5 w-3.5 text-primary" />
        </div>

        {/* body */}
        <div className="space-y-2 p-4 font-mono text-[13px]">
          <div className="flex items-center gap-3">
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary-glow">GET</span>
            <span className="text-muted-foreground">/api/v1/ledger/reconcile</span>
          </div>

          {[
            { dot: "bg-emerald-400", pulse: true, label: "M-Pesa callback received", value: "+KES 4,200.00", tone: "text-emerald-300" },
            { dot: "bg-primary", pulse: false, label: "Tenant invoice matched", value: "INV-08412", tone: "text-primary-glow" },
            { dot: "bg-amber-400", pulse: false, label: "SMS receipt dispatched", value: "0.42s", tone: "text-amber-200" },
            { dot: "bg-emerald-400", pulse: true, label: "Ledger posted · 12,402 rows", value: "OK", tone: "text-emerald-300" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-md border border-border/70 bg-background/60 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${row.dot} ${row.pulse ? "animate-pulse" : ""}`} />
                <span className="text-xs text-muted-foreground">{row.label}</span>
              </div>
              <span className={`text-xs font-semibold ${row.tone}`}>{row.value}</span>
            </div>
          ))}

          <div className="!mt-4 flex items-center justify-between border-t border-border/70 pt-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">latency</div>
            <div className="font-mono text-xs text-primary-glow">42ms · p99</div>
          </div>
        </div>
      </div>

      {/* floating stat chip */}
      <div className="absolute -bottom-5 -right-4 rounded-2xl border border-border bg-card px-5 py-3 shadow-xl sm:-right-6">
        <div className="font-display text-2xl font-bold tracking-tight">99.99%</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Uptime SLA</div>
      </div>
    </div>
  );
}




/* ────────────────────────────────────────────────────────────────
   BENTO SERVICES
   ──────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Users,
    title: "Role-Based Access Platforms",
    copy: "Granular control for field agents, accountants, and executives — with full data isolation and bank-grade security.",
    span: "md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    icon: CreditCard,
    title: "M-Pesa & API Workflow Choreography",
    copy: "Real-time payment reconciliation, automated SMS receipts, and direct posting to your internal ledger.",
    span: "",
  },
  {
    icon: Leaf,
    title: "Green Energy & Smart Assets",
    copy: "Custom utility tracking, consumption reporting, and multi-tenant billing for solar and IoT operators.",
    span: "",
  },
  {
    icon: Building2,
    title: "Property Management Software",
    copy: "Turnkey rent automation, tenant self-service portals, automated invoice reminders, and live portfolio metrics.",
    span: "md:col-span-2",
  },
  {
    icon: Headphones,
    title: "Customer Self-Service Portals",
    copy: "Interactive portals letting your clients manage their own accounts, statements, and requests — 24/7.",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Management Reporting",
    copy: "Live, automated analytics that surface revenue leakages and operational risk before they hit the bottom line.",
    span: "",
  },
];

function Bento() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <SectionHeader
        eyebrow="What we build"
        title="Six production-grade systems. Tailored to your workflow."
        subtitle="Battle-tested foundations we ship fast — and you own forever."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-4 md:auto-rows-[minmax(220px,auto)]">
        {SERVICES.map((it, i) => (
          <article
            key={it.title}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl ${it.span}`}
          >
            {it.accent && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
                style={{ background: "var(--gradient-electric)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="relative flex h-full flex-col pb-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-primary/10 text-primary-glow transition-transform group-hover:scale-110">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className={`mt-5 font-bold tracking-tight text-foreground ${it.accent ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                {it.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${it.accent ? "max-w-md" : ""}`}>
                {it.copy}
              </p>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"
        >
          See full service breakdown
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   PROMISE
   ──────────────────────────────────────────────────────────────── */
function Promise() {
  const pillars = [
    {
      icon: ShieldCheck,
      n: "01",
      title: "Bulletproof Security",
      copy: "Row-level isolation, audit trails, and RBAC by default — not as an afterthought.",
    },
    {
      icon: BarChart3,
      n: "02",
      title: "Reporting You'll Open",
      copy: "Beautifully structured dashboards that surface leakages and risk in real time.",
    },
    {
      icon: LifeBuoy,
      n: "03",
      title: "Support After Launch",
      copy: "Continuous server monitoring, proactive maintenance, and dedicated lifecycle support — for life.",
    },
  ];

  return (
    <section className="relative border-t border-border py-20 sm:py-24">
      <SectionHeader
        eyebrow="Our promise"
        title="Built to last. Supported for life."
        subtitle="Three commitments that separate Boafo from freelancers and off-the-shelf templates."
      />
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-3 md:gap-12">
        {pillars.map((p) => (
          <div key={p.title} className="group">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-widest text-primary-glow">{p.n}</span>
              <div className="h-px flex-1 bg-border" />
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-primary/10 text-primary-glow transition-transform group-hover:scale-110">
                <p.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   BOLD FOOTER CTA
   ──────────────────────────────────────────────────────────────── */
function FooterCTA() {
  return (
    <section className="px-5 pb-16 pt-8 sm:px-8 sm:pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/40 bg-gradient-to-br from-primary/95 via-primary to-[oklch(0.45_0.22_290)] p-10 text-primary-foreground sm:p-16 lg:p-20">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-black/20 blur-3xl" />

        <div className="relative max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground/70">
            Boafo · supported for life
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Custom web portals, M-Pesa integration, and business automation for modern enterprises.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Built to ease the everyday grind and supported for life.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="mailto:info@boafosolutions.com"
              className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]"
            >
              info@boafosolutions.com
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+254737575156"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-white/10"
            >
              0737 575 156
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/75">
            <a href="https://wa.me/254737575156" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">
              WhatsApp
            </a>
            <a href="mailto:info@boafosolutions.com" className="hover:text-primary-foreground">
              Email
            </a>
            <a href="tel:+254737575156" className="hover:text-primary-foreground">
              Call
            </a>
            <span className="text-primary-foreground/50">© 2026 Boafo Solutions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   SHARED
   ──────────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
      <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary-glow">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
