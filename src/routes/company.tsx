import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  PencilRuler,
  Code2,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AiSummary, BOAFO_CORE_SERVICES, BOAFO_INDUSTRIES, BOAFO_LOCATION, BOAFO_CONTACT } from "@/components/AiSummary";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company | Boafo Solutions — Enterprise Software That Lasts" },
      {
        name: "description",
        content:
          "Boafo Solutions is a boutique enterprise software studio in Nairobi. Architecture-first engineering, transparent process, and lifetime support — not freelancer roulette.",
      },
      { property: "og:title", content: "Company | Boafo Solutions — Enterprise Software That Lasts" },
      {
        property: "og:description",
        content:
          "Architecture-first engineering and lifetime support for the modern enterprise. Meet the operating model behind Boafo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.boafosolutions.com/company" },
      { property: "og:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
    ],
    links: [{ rel: "canonical", href: "https://www.boafosolutions.com/company" }],
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
                { "@type": "ListItem", position: 2, name: "Company", item: "https://www.boafosolutions.com/company" },
              ],
            },
            {
              "@type": "AboutPage",
              "@id": "https://www.boafosolutions.com/company#webpage",
              url: "https://www.boafosolutions.com/company",
              name: "About Boafo Solutions",
              about: { "@id": "https://www.boafosolutions.com/#organization" },
              inLanguage: "en",
              description:
                "Boafo Solutions is a boutique enterprise software studio. Architecture-first engineering, transparent process, and lifetime support.",
            },
          ],
        }),
      },
    ],
  }),
  component: CompanyPage,
});

/* ────────────────────────── design language ────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;
// Use site-wide typography tokens (Space Grotesk on display text, DM Sans on body)
const DISPLAY = "font-display";
const SANS = "font-sans";

// Midnight Indigo accent system — scoped to the company page via inline styles.
const INDIGO_50 = "#eef0ff";
const INDIGO_300 = "#a5b4fc";
const INDIGO_500 = "#4f46e5";
const INDIGO_900 = "#1e1e5a";
const INDIGO_950 = "#141432";
const INK = "#0a0a1a";

const tileBase =
  "group relative overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur p-7 sm:p-8 shadow-md transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.7, ease: EASE },
  }),
};

/* ────────────────────────── content ────────────────────────── */
const TIMELINE = [
  {
    code: "01",
    title: "Architecture Call",
    body: "A 30-minute working session. We map your bottleneck, integrations, and the cost of doing nothing — then send a one-page technical brief.",
    icon: Compass,
  },
  {
    code: "02",
    title: "Systems Blueprint",
    body: "Data model, role matrix, API contracts, UI flows. You see exactly what we'll ship before a single line of production code is written.",
    icon: PencilRuler,
  },
  {
    code: "03",
    title: "Iterative Engineering",
    body: "Two-week increments, demoed live. Postgres, Node, React, Daraja, IoT — composed into a coherent platform under version control from day one.",
    icon: Code2,
  },
  {
    code: "04",
    title: "Production Launch",
    body: "Blue-green deploy onto hardened infrastructure. Logs, alerts, backups and a runbook handed to your team — not a zip file and a goodbye.",
    icon: Rocket,
  },
  {
    code: "05",
    title: "Lifetime Support",
    body: "We watch the dashboards so you don't. SLA monitoring, monthly reviews, and continuous improvement — for as long as the system runs.",
    icon: ShieldCheck,
  },
];

const VALUES = [
  {
    title: "Engineering integrity",
    body: "We build for the next three years, not the next sprint. Every decision is documented, every trade-off is explained.",
  },
  {
    title: "Radical transparency",
    body: "Live project boards, weekly written updates, real demos. You always know exactly where your platform stands.",
  },
  {
    title: "Client ownership",
    body: "Your repositories, your cloud accounts, your data. We hand over the keys on day one and keep them in your hands forever.",
  },
  {
    title: "Long-term accountability",
    body: "Launch day is the start of the relationship, not the end. We monitor, patch and improve every system we ship.",
  },
];

const EXPERTISE = [
  "Custom software development & enterprise applications",
  "Web development with React, Next.js and TanStack",
  "Mobile app development for iOS and Android",
  "Cloud solutions, DevOps and platform engineering",
  "AI integration, machine learning and intelligent automation",
  "API design, systems integration and legacy modernisation",
  "IT consulting, technical due diligence and architecture audits",
  "Digital transformation and business process automation",
];

const INDUSTRIES = [
  "Financial services & fintech",
  "Logistics & supply chain",
  "Manufacturing & industrial IoT",
  "Healthcare & life sciences",
  "Retail, commerce & payments",
  "Public sector & education",
];

const STACK = [
  { label: "Frontend", body: "React, Next.js, TanStack Start, TypeScript, Tailwind, React Native." },
  { label: "Backend", body: "Node.js, Python, Go, PostgreSQL, Redis, GraphQL, REST and event-driven APIs." },
  { label: "Cloud & DevOps", body: "AWS, Cloudflare, GCP, Kubernetes, Terraform, GitHub Actions, observability." },
  { label: "AI & automation", body: "LLM integration, vector search, RAG, workflow automation, document intelligence." },
  { label: "Data & integrations", body: "Warehousing, ETL, Daraja, Stripe, Twilio, ERP and CRM connectors." },
  { label: "Security", body: "Zero-trust architecture, SSO, audit logging, encryption-at-rest, continuous scanning." },
];

const WHY = [
  { k: "Senior-only delivery", v: "No junior pool, no offshore handoff. The architect who scopes ships." },
  { k: "Lifetime support", v: "We monitor, patch and improve every platform — for as long as it runs." },
  { k: "Outcome-based engagements", v: "We commit to business outcomes, not just deliverables." },
  { k: "Full ownership transfer", v: "Your code, your cloud, your data. No vendor lock-in, ever." },
  { k: "Transparent pricing", v: "Fixed-scope blueprints, predictable monthly operations." },
  { k: "Domain depth", v: "Real expertise in regulated industries — not a generic playbook." },
];

/* ────────────────────────── primitives ────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
      {children}
    </p>
  );
}

function DisplayH2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`${DISPLAY} text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      className={`${tileBase} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, ${INDIGO_500}55, transparent)` }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* ────────────────────────── page ────────────────────────── */
function CompanyPage() {
  return (
    <div
      className={`${SANS} min-h-screen antialiased bg-background text-foreground`}
    >
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 50% at 18% 10%, ${INDIGO_900}88, transparent 60%), radial-gradient(50% 40% at 85% 12%, ${INDIGO_500}33, transparent 65%), radial-gradient(45% 35% at 50% 100%, ${INDIGO_900}55, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(165,180,252,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <SiteNav />

      <main className="pt-28 sm:pt-32">
        <AiSummary
          title="About Boafo Solutions"
          summary="Boafo Solutions is a boutique enterprise software studio in Nairobi, Kenya. We are senior-only engineers building custom software, web portals, mobile apps, cloud infrastructure, and AI-powered automation for organisations across financial services, logistics, manufacturing, healthcare, retail, and the public sector. Architecture-first, transparent by default, and accountable for the lifetime of every system we ship."
          services={BOAFO_CORE_SERVICES}
          industries={BOAFO_INDUSTRIES}
          location={BOAFO_LOCATION}
          contact={BOAFO_CONTACT}
        />
        {/* ───────────── HERO BENTO ───────────── */}
        <section className="px-5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 flex items-center justify-between"
            >
              <Eyebrow>Company · Boafo Solutions · Est. operating model</Eyebrow>
              <span
                className="hidden font-mono text-[11px] uppercase tracking-[0.3em] sm:inline"
              >
                Vol. 01 — The Studio
              </span>
            </motion.div>

            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              {/* Manifesto headline */}
              <Tile className="col-span-12 lg:col-span-8 lg:row-span-2">
                <div className="flex h-full flex-col justify-between gap-10">
                  <div>
                    <Eyebrow>Manifesto</Eyebrow>
                    <h1
                      className={`${DISPLAY} mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl`}
                    >
                      Built to last.{" "}
                      <span
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${INDIGO_300}, ${INDIGO_500})`,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        Supported for life.
                      </span>
                    </h1>
                    <p
                      className={`${SANS} mt-6 max-w-xl text-pretty text-base leading-relaxed sm:text-lg`}
                    >
                      Boafo Solutions is the small, senior software company that engineers your
                      operating backbone — then stays to run it. Architecture-first, transparent
                      by default, accountable for the lifetime of every system we ship.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className={`${SANS} inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5`}
                      style={{
                        background: `linear-gradient(135deg, ${INDIGO_500}, ${INDIGO_900})`,
                        boxShadow: `0 14px 30px -12px ${INDIGO_500}aa`,
                      }}
                    >
                      Initiate architecture discovery
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/work"
                      className={`${SANS} inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5`}
                      style={{ borderColor: "rgba(165,180,252,0.25)" }}
                    >
                      See systems in production
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Tile>

              {/* Stat — clients */}
              <Tile className="col-span-6 lg:col-span-4" delay={1}>
                <Eyebrow>Retention</Eyebrow>
                <p className={`${DISPLAY} mt-3 text-5xl font-extrabold text-foreground sm:text-6xl`}>
                  94<span style={{ color: INDIGO_300 }}>%</span>
                </p>
                <p
                  className={`${SANS} mt-2 text-sm`}
                >
                  of clients renew year on year — because the software keeps working and the team
                  keeps showing up.
                </p>
              </Tile>

              {/* Stat — uptime */}
              <Tile className="col-span-6 lg:col-span-4" delay={2}>
                <Eyebrow>Production uptime</Eyebrow>
                <p className={`${DISPLAY} mt-3 text-5xl font-extrabold text-foreground sm:text-6xl`}>
                  99.98<span style={{ color: INDIGO_300 }}>%</span>
                </p>
                <p
                  className={`${SANS} mt-2 text-sm`}
                >
                  Rolling 12-month average across every platform under our SLA — measured, not
                  marketing.
                </p>
              </Tile>
            </div>
          </div>
        </section>

        {/* ───────────── OVERVIEW + STORY ───────────── */}
        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <Tile className="col-span-12 lg:col-span-7">
                <Eyebrow>Company overview</Eyebrow>
                <DisplayH2 className="mt-4">
                  A boutique software company engineering the{" "}
                  <span style={{ color: INDIGO_300 }}>
                    operating backbone
                  </span>{" "}
                  of modern enterprises.
                </DisplayH2>
                <div
                  className={`${SANS} mt-6 space-y-4 text-pretty text-base leading-relaxed sm:text-lg`}
                >
                  <p>
                    Boafo Solutions is an enterprise software company specialising in custom
                    software development, web development, mobile app development and cloud
                    solutions for operators who have outgrown spreadsheets, off-the-shelf SaaS
                    and freelance marketplaces. We design, build, deploy and operate
                    production-grade platforms for organisations across financial services,
                    logistics, manufacturing, healthcare and the public sector — and we stay on
                    call for the lifetime of every system we ship.
                  </p>
                  <p>
                    Unlike traditional IT consulting firms, we do not bill discovery decks and
                    hand the build off to a junior pool. The senior engineer who maps your
                    bottleneck on day one is the same senior engineer who ships your platform,
                    monitors the dashboards at 2 a.m. and walks your team through the quarterly
                    improvement plan. That continuity is the entire reason Boafo exists.
                  </p>
                </div>
              </Tile>

              <Tile className="col-span-12 lg:col-span-5">
                <Eyebrow>Our story</Eyebrow>
                <h3 className={`${DISPLAY} mt-4 text-2xl font-bold text-foreground sm:text-3xl`}>
                  Founded as a deliberate third option.
                </h3>
                <div
                  className={`${SANS} mt-5 space-y-4 text-pretty text-base leading-relaxed`}
                >
                  <p>
                    Boafo was founded by engineers who had spent a decade rescuing broken
                    enterprise builds — half-finished ERPs, abandoned mobile apps, brittle
                    integrations glued together by departed contractors. The pattern was always
                    the same: a business chose the cheapest path, paid in lost revenue, then
                    paid again to rebuild.
                  </p>
                  <p>
                    We launched Boafo as a small, senior team that treats software as long-lived
                    infrastructure, not a one-time deliverable. Every engagement begins with a
                    working architecture call and ends, years later, with a platform that still
                    runs reliably and still belongs entirely to the client.
                  </p>
                </div>
              </Tile>

              <Tile className="col-span-12 lg:col-span-6">
                <Eyebrow>Our mission</Eyebrow>
                <p className={`${DISPLAY} mt-4 text-xl font-semibold leading-snug text-foreground sm:text-2xl`}>
                  To engineer enterprise software that organisations can{" "}
                  <span style={{ color: INDIGO_300 }}>
                    bet quarterly targets on
                  </span>{" "}
                  — combining architecture-first development, transparent process and lifetime
                  support to eliminate the freelancer roulette that costs businesses millions
                  every year.
                </p>
              </Tile>

              <Tile className="col-span-12 lg:col-span-6">
                <Eyebrow>Our vision</Eyebrow>
                <p className={`${DISPLAY} mt-4 text-xl font-semibold leading-snug text-foreground sm:text-2xl`}>
                  A future where every operator — from regional logistics firm to multinational
                  bank — has access to a{" "}
                  <span style={{ color: INDIGO_300 }}>
                    senior, accountable engineering partner
                  </span>{" "}
                  that designs business technology around their actual workflow, not around a
                  generic template.
                </p>
              </Tile>
            </div>
          </div>
        </section>

        {/* ───────────── CORE VALUES BENTO ───────────── */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Core values</Eyebrow>
                <DisplayH2 className="mt-3">
                  Four non-negotiables. <span style={{ color: INDIGO_300 }}>Every engagement.</span>
                </DisplayH2>
              </div>
              <p
                className={`${SANS} max-w-md text-sm leading-relaxed`}
              >
                The operating principles every Boafo engineer signs up to on day one — and is
                held to from kickoff to retirement of the system.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              {VALUES.map((v, i) => (
                <Tile key={v.title} className="col-span-12 sm:col-span-6 lg:col-span-3" delay={i}>
                  <p
                    className={`${DISPLAY} text-4xl font-extrabold`}
                    style={{ color: INDIGO_300 }}
                  >
                    0{i + 1}
                  </p>
                  <h3 className={`${DISPLAY} mt-4 text-xl font-bold text-foreground`}>{v.title}</h3>
                  <p
                    className={`${SANS} mt-3 text-sm leading-relaxed`}
                  >
                    {v.body}
                  </p>
                </Tile>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── EXPERTISE + INDUSTRIES ───────────── */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <Tile className="col-span-12 lg:col-span-7">
                <Eyebrow>Our expertise</Eyebrow>
                <DisplayH2 className="mt-3 text-3xl sm:text-4xl">
                  End-to-end software development across the full product lifecycle.
                </DisplayH2>
                <p
                  className={`${SANS} mt-5 text-base leading-relaxed`}
                >
                  Deep, hands-on experience across the disciplines modern enterprises need most —
                  composed into a single, coherent platform by people who have shipped it before.
                </p>
                <ul className={`${SANS} mt-7 grid gap-3 sm:grid-cols-2 text-sm`}>
                  {EXPERTISE.map((e) => (
                    <li
                      key={e}
                      className="flex gap-3 leading-relaxed"
                    >
                      <span style={{ color: INDIGO_300 }}>▹</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </Tile>

              <Tile className="col-span-12 lg:col-span-5">
                <Eyebrow>Industries we serve</Eyebrow>
                <h3 className={`${DISPLAY} mt-4 text-2xl font-bold text-foreground sm:text-3xl`}>
                  Regulated, high-stakes, integration-heavy.
                </h3>
                <p
                  className={`${SANS} mt-4 text-sm leading-relaxed`}
                >
                  We partner with operators where downtime is expensive and trust is
                  non-negotiable. Our teams are fluent in the workflows, compliance regimes and
                  integration patterns of the sectors we serve.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {INDUSTRIES.map((ind) => (
                    <li
                      key={ind}
                      className={`${SANS} rounded-xl border border-foreground/10 px-4 py-3 text-sm text-foreground/85`}
                    >
                      {ind}
                    </li>
                  ))}
                </ul>
              </Tile>
            </div>
          </div>
        </section>

        {/* ───────────── TECH STACK BENTO ───────────── */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <Eyebrow>Our technology stack</Eyebrow>
              <DisplayH2 className="mt-3">
                Deliberate tools.{" "}
                <span style={{ color: INDIGO_300 }}>
                  Boring infrastructure, bulletproof outcomes.
                </span>
              </DisplayH2>
              <p
                className={`${SANS} mt-5 text-base leading-relaxed`}
              >
                Every component of our stack has been battle-tested in production, has a healthy
                long-term maintenance trajectory and interoperates cleanly with the rest.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              {STACK.map((s, i) => (
                <Tile
                  key={s.label}
                  className={`col-span-12 sm:col-span-6 lg:col-span-4 ${
                    i === 0 ? "lg:row-span-1" : ""
                  }`}
                  delay={i}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`${DISPLAY} text-xl font-bold text-foreground`}>{s.label}</h3>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: "rgba(165,180,252,0.6)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p
                    className={`${SANS} mt-3 text-sm leading-relaxed`}
                  >
                    {s.body}
                  </p>
                </Tile>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── PROCESS TIMELINE ───────────── */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid grid-cols-12 gap-4 sm:gap-5">
              <div className="col-span-12 lg:col-span-7">
                <Eyebrow>Our development process</Eyebrow>
              <DisplayH2 className="mt-3">
                How a single call becomes a{" "}
                <span style={{ color: INDIGO_300 }}>
                  running platform.
                </span>
              </DisplayH2>
              </div>
              <p
                className={`${SANS} col-span-12 self-end text-sm leading-relaxed lg:col-span-5`}
              >
                The same five-stage operating model, every engagement. Fortnightly demos, written
                status reports and access to the same project board our engineers use. No
                surprises, no scope drama, no opaque progress.
              </p>
            </div>

            <ol className="grid grid-cols-12 gap-4 sm:gap-5">
              {TIMELINE.map((step, i) => {
                const Icon = step.icon;
                const span = i === 0 || i === 4 ? "lg:col-span-3" : "lg:col-span-2";
                return (
                  <Tile
                    key={step.code}
                    className={`col-span-12 sm:col-span-6 ${span}`}
                    delay={i}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`${DISPLAY} text-3xl font-bold`}
                        style={{ color: INDIGO_300 }}
                      >
                        {step.code}
                      </span>
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full border"
                        style={{
                          borderColor: "rgba(165,180,252,0.3)",
                          background: "rgba(79,70,229,0.12)",
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: INDIGO_300 }} />
                      </span>
                    </div>
                    <h3 className={`${DISPLAY} mt-5 text-xl font-bold text-foreground`}>{step.title}</h3>
                    <p
                      className={`${SANS} mt-3 text-sm leading-relaxed`}
                    >
                      {step.body}
                    </p>
                  </Tile>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ───────────── WHY CHOOSE + INNOVATION + COMMITMENT ───────────── */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              <Tile className="col-span-12 lg:col-span-7">
                <Eyebrow>Why choose Boafo Solutions</Eyebrow>
                <DisplayH2 className="mt-3">
                  What separates us from agencies, marketplaces and traditional consultancies.
                </DisplayH2>
                <dl className="mt-8 divide-y" style={{ borderColor: "rgba(165,180,252,0.12)" }}>
                  {WHY.map((w) => (
                    <div
                      key={w.k}
                      className="grid grid-cols-12 gap-4 py-5"
                      style={{ borderColor: "rgba(165,180,252,0.12)" }}
                    >
                      <dt
                        className={`${DISPLAY} col-span-12 text-lg font-semibold text-foreground sm:col-span-5 sm:text-xl`}
                      >
                        {w.k}
                      </dt>
                      <dd
                        className={`${SANS} col-span-12 text-sm leading-relaxed sm:col-span-7`}
                      >
                        {w.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Tile>

              <div className="col-span-12 grid grid-cols-1 gap-4 sm:gap-5 lg:col-span-5">
                <Tile>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4" style={{ color: INDIGO_300 }} />
                    <Eyebrow>Innovation &amp; digital transformation</Eyebrow>
                  </div>
                  <h3 className={`${DISPLAY} mt-4 text-2xl font-bold text-foreground`}>
                    Practical automation. Not slogans.
                  </h3>
                  <p
                    className={`${SANS} mt-4 text-sm leading-relaxed`}
                  >
                    We help clients modernise legacy enterprise systems, migrate workloads to the
                    cloud, embed AI into operational decision-making and unlock new revenue
                    streams through better data. Whether the goal is to integrate a decades-old
                    ERP with a new mobile workforce, deploy real-time analytics or layer machine
                    learning over an existing product, our engineers translate ambitious business
                    strategy into shipping software.
                  </p>
                </Tile>

                <Tile>
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="h-4 w-4" style={{ color: INDIGO_300 }} />
                    <Eyebrow>Our commitment to clients</Eyebrow>
                  </div>
                  <h3 className={`${DISPLAY} mt-4 text-2xl font-bold text-foreground`}>
                    We answer the phone at 3 a.m.
                  </h3>
                  <p
                    className={`${SANS} mt-4 text-sm leading-relaxed`}
                  >
                    Clients hire Boafo because they want a partner that treats their platform like
                    its own — writing the runbook a junior engineer can follow, refusing features
                    that create technical debt, standing behind every SLA and proactively
                    recommending the cheaper path even when it shrinks our own retainer.
                  </p>
                </Tile>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section className="px-5 pb-28 sm:px-8 sm:pb-36">
          <div className="mx-auto max-w-7xl">
            <Tile className="overflow-hidden">
              <div className="grid grid-cols-12 items-center gap-8">
                <div className="col-span-12 lg:col-span-8">
                  <Eyebrow>Partnership — not a project</Eyebrow>
                  <h2
                    className={`${DISPLAY} mt-4 text-balance text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl`}
                  >
                    Let's map your bottleneck —{" "}
                    <span style={{ color: INDIGO_300 }}>
                      together.
                    </span>
                  </h2>
                  <p
                    className={`${SANS} mt-5 max-w-xl text-base leading-relaxed`}
                  >
                    30 minutes. Working session. You leave with a one-page technical brief,
                    whether we build together or not.
                  </p>
                </div>

                <div className="col-span-12 flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <Link
                    to="/contact"
                    className={`${SANS} inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 lg:w-auto`}
                    style={{
                      background: `linear-gradient(135deg, ${INDIGO_500}, ${INDIGO_900})`,
                      boxShadow: `0 18px 40px -12px ${INDIGO_500}cc`,
                    }}
                  >
                    Initiate architecture discovery
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/work"
                    className={`${SANS} inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 lg:w-auto`}
                    style={{ borderColor: "rgba(165,180,252,0.25)" }}
                  >
                    See systems in production
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Tile>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
