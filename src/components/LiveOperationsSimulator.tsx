import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Cpu,
  Zap,
  Radio,
  Building2,
  Sun,
  Truck,
  Banknote,
  Sparkles,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   DATA MATRICES
   ──────────────────────────────────────────────────────────────── */

type Step = { t: number; label: string };
type Vertical = {
  id: string;
  label: string;
  short: string;
  Icon: typeof Banknote;
  before: string;
  after: string;
  beforeStats: { value: string; label: string }[];
  afterStats: { value: string; label: string }[];
  pipeline: Step[];
};

const VERTICALS: Vertical[] = [
  {
    id: "retail",
    label: "Retail & Financial Services",
    short: "Retail / Finance",
    Icon: Banknote,
    before:
      "Accountants hunt scattered mobile payments and bank transfers across endless email threads. Customers pay via disparate apps, send screenshots, and your team manual-keys each one into Excel. Reconciliation closes 4 days late and $25k goes missing every month.",
    after:
      "Auto-reconciled core ledgers with instant digital receipts. Boafo plugs directly into your payment gateway APIs and banking webhooks, parses metadata, matches transaction hashes to outstanding invoices, updates your central database, and dispatches a branded confirmation SMS.",
    beforeStats: [
      { value: "3.5 hrs/day", label: "Manual reconciliation" },
      { value: "~$25,000", label: "Monthly leakage" },
      { value: "+4 days", label: "Close delay" },
    ],
    afterStats: [
      { value: "0 min", label: "Manual effort" },
      { value: "99.7%", label: "Match rate" },
      { value: "Live", label: "Close cycle" },
    ],
    pipeline: [
      { t: 0.2, label: "Payment webhook callback received" },
      { t: 0.5, label: "Cryptographic invoice hash match" },
      { t: 0.9, label: "Central ledger posted · receipt dispatched" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate & Property Portals",
    short: "Real Estate",
    Icon: Building2,
    before:
      "Property managers spend the first 10 days of the month downloading bank statements, matching vague wire transfer references to house numbers, and manual-billing water consumption meters one tenant at a time.",
    after:
      "Turnkey rent automation with intelligent tenant portals. Utility meters broadcast usage to our tracking engines, auto-generating localized invoices. When a tenant pays via the portal, accounts clear instantly.",
    beforeStats: [
      { value: "5.0 hrs/day", label: "Statement chasing" },
      { value: "6.5%", label: "Rental leakage" },
      { value: "7 days", label: "Dispute resolution" },
    ],
    afterStats: [
      { value: "8 min/day", label: "Operator touch" },
      { value: "100%", label: "Verified recovery" },
      { value: "Auto", label: "Invoicing engine" },
    ],
    pipeline: [
      { t: 0.1, label: "Smart meter utility packet parsed" },
      { t: 0.4, label: "Micro-tenant invoice generated" },
      { t: 0.7, label: "Push delivery · payment hook primed" },
    ],
  },
  {
    id: "solar",
    label: "Solar / Clean Energy Utilities",
    short: "Solar / Utilities",
    Icon: Sun,
    before:
      "Operations staff manually verify hardware tokens, copying strings from third-party vendor applications into local spreadsheets. Delayed activations cause hardware downtime and customer frustration.",
    after:
      "Custom utility telemetry pipelines and automated multi-tenant billing engines. Direct secure connections to solar inverter APIs and IoT meters allow instant token generation, remote asset shutoff, and live usage monitoring.",
    beforeStats: [
      { value: "4.0 hrs/day", label: "Token handling" },
      { value: "12%", label: "Downtime frequency" },
      { value: "Rising", label: "Customer churn" },
    ],
    afterStats: [
      { value: "0", label: "Manual minutes" },
      { value: "99.98%", label: "Asset uptime" },
      { value: "<1s", label: "Token delivery" },
    ],
    pipeline: [
      { t: 0.2, label: "IoT consumption spike logged" },
      { t: 0.5, label: "Multi-tenant tariff applied" },
      { t: 0.8, label: "Hardware token provisioned · OTA activation" },
    ],
  },
  {
    id: "logistics",
    label: "Logistics & Field Distribution",
    short: "Logistics",
    Icon: Truck,
    before:
      "Field drivers collect cash and paper waybills, returning them to HQ at midnight. Dispatchers cross-reference fuel receipts, route sheets, and physical delivery boxes — with no real-time inventory visibility.",
    after:
      "Real-time workflow choreography connecting remote telemetry to corporate ledgers. Drivers scan digital waybills via field agent portals. Inventory deducts automatically, and transit payments clear into the ledger instantly.",
    beforeStats: [
      { value: "6.0 hrs/day", label: "Reconciliation" },
      { value: "4.2%", label: "Inventory variance" },
      { value: "Delayed", label: "Route optimization" },
    ],
    afterStats: [
      { value: "4 min/trip", label: "Driver overhead" },
      { value: "0.01%", label: "Discrepancies" },
      { value: "Real-time", label: "Fleet visibility" },
    ],
    pipeline: [
      { t: 0.3, label: "Handheld mobile waybill QR scanned" },
      { t: 0.6, label: "Warehouse inventory deducted" },
      { t: 1.0, label: "Fleet ledger audited · route dispatched" },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────────── */

export function LiveOperationsSimulator() {
  const [activeId, setActiveId] = useState(VERTICALS[0].id);
  const [manualOverride, setManualOverride] = useState(false);
  const active = useMemo(() => VERTICALS.find((v) => v.id === activeId)!, [activeId]);

  /* Auto-cycle through verticals every 5 s — stops permanently once the user picks a tab */
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (manualOverride) return;
    timerRef.current = setInterval(() => {
      setActiveId((prev) => {
        const idx = VERTICALS.findIndex((v) => v.id === prev);
        const next = VERTICALS[(idx + 1) % VERTICALS.length];
        return next.id;
      });
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [manualOverride]);

  const handleManualTab = (id: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setManualOverride(true);
    setActiveId(id);
  };

  return (
    <section
      id="simulator"
      className="relative overflow-hidden border-y border-border py-16 sm:py-24"
      style={{
        background:
          "radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 60%), radial-gradient(800px 500px at 0% 100%, color-mix(in oklab, var(--color-primary-glow) 10%, transparent), transparent 60%), var(--color-surface)",
        contain: "layout paint style",
      }}
    >
      {/* grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-primary-glow sm:text-[11px] sm:tracking-[0.28em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-glow" />
              </span>
              Live Operations · Command Center
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              The friction vs. the engine.
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Switch verticals to watch a Boafo-engineered workflow replace the manual reality,
              end-to-end, in under a second.
            </p>
          </div>

          {/* Tab selector */}
          <LayoutGroup id="sim-tabs">
            <div
              role="tablist"
              aria-label="Industry verticals"
              className="-mx-1 flex w-full snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-2xl border border-border bg-background/50 p-1.5 backdrop-blur-xl md:mx-0 md:w-auto md:flex-wrap md:gap-2 md:overflow-visible"
              style={{ boxShadow: "var(--shadow-deep)" }}
            >
              {VERTICALS.map((v) => {
                const isActive = activeId === v.id;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleManualTab(v.id)}
                    className="relative isolate inline-flex shrink-0 snap-start items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-tight transition-colors sm:text-sm"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sim-tab-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-xl"
                        style={{
                          background: "var(--gradient-electric)",
                          boxShadow:
                            "0 0 0 1px color-mix(in oklab, var(--color-primary-glow) 50%, transparent), 0 10px 30px -10px color-mix(in oklab, var(--color-primary) 60%, transparent)",
                        }}
                      />
                    )}
                    <v.Icon
                      className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`whitespace-nowrap ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      {v.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Tri-pane: Before | Boafo Engine | After */}
        <div className="grid min-h-[720px] gap-5 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-6 lg:min-h-[620px] xl:min-h-[640px]">
          <BeforePane key={`b-${active.id}`} v={active} />
          <CenterEngine key={`c-${active.id}`} v={active} />
          <AfterPane key={`a-${active.id}`} v={active} />
        </div>

        {/* CTA */}
        <ConversionFooter />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   CENTER ENGINE — Boafo Solutions branded core with flow graph
   ──────────────────────────────────────────────────────────────── */
function CenterEngine({ v }: { v: Vertical }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.03 }}
      className="relative flex h-[520px] sm:h-[560px] lg:h-full flex-col overflow-hidden rounded-3xl border border-primary/40 bg-card/80 p-6 backdrop-blur-xl sm:p-7"
      style={{
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklab, var(--color-primary-glow) 22%, transparent), 0 0 90px -20px color-mix(in oklab, var(--color-primary) 70%, transparent)",
      }}
    >
      {/* radial ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(420px 220px at 50% 0%, color-mix(in oklab, var(--color-primary-glow) 28%, transparent), transparent 65%)",
        }}
      />
      {/* orbiting rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.div
          className="h-72 w-72 rounded-full border border-primary/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-primary-glow">
          <Sparkles className="h-3 w-3" />
          The Boafo Engine
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          Boafo <span className="text-gradient">Solutions</span>
        </h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Autonomous workflow choreography
        </p>
        <div className="mt-3">
          <LiveTicker />
        </div>
      </div>

      <div className="relative mt-2 flex-1">
        <FlowChart key={`flow-${v.id}`} steps={v.pipeline} />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   BEFORE PANE
   ──────────────────────────────────────────────────────────────── */

function BeforePane({ v }: { v: Vertical }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative flex h-[520px] sm:h-[560px] lg:h-full flex-col overflow-hidden rounded-3xl border border-destructive/25 bg-card/70 p-6 backdrop-blur-xl sm:p-7"
      style={{
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklab, var(--color-foreground) 6%, transparent), 0 0 60px -20px color-mix(in oklab, var(--color-destructive) 35%, transparent)",
      }}
    >
      {/* warning ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "color-mix(in oklab, var(--color-destructive) 60%, transparent)" }}
      />
      {/* scanline noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-destructive">
            <AlertTriangle className="h-3 w-3" />
            Before · Manual Friction
          </span>
          <ManualPulse />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={v.id + "-before-copy"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
            >
              {v.before}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="shrink-0 grid grid-cols-3 gap-2 pt-5 sm:gap-3 sm:pt-6">
          {v.beforeStats.map((s, i) => (
            <Stat
              key={`${v.id}-bs-${i}`}
              value={s.value}
              label={s.label}
              variant="danger"
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ManualPulse() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-destructive/70"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}
      <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-destructive/80">
        Drift
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   AFTER PANE
   ──────────────────────────────────────────────────────────────── */

function AfterPane({ v }: { v: Vertical }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className="relative flex h-[520px] sm:h-[560px] lg:h-full flex-col overflow-hidden rounded-3xl border border-primary/35 bg-card/70 p-6 backdrop-blur-xl sm:p-7"
      style={{
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklab, var(--color-primary-glow) 14%, transparent), 0 0 70px -20px color-mix(in oklab, var(--color-primary) 55%, transparent)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-electric)" }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-primary-glow">
            <Sparkles className="h-3 w-3" />
            After · Boafo Engine
          </span>
          <SuccessPulse />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={v.id + "-after-copy"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
            >
              {v.after}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="shrink-0 grid grid-cols-3 gap-2 pt-5 sm:gap-3 sm:pt-6">
          {v.afterStats.map((s, i) => (
            <Stat
              key={`${v.id}-as-${i}`}
              value={s.value}
              label={s.label}
              variant="success"
              delay={0.15 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SuccessPulse() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary-glow"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
      <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">
        Flow
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE TICKER — pulses metrics every second
   ──────────────────────────────────────────────────────────────── */
function LiveTicker() {
  const [tps, setTps] = useState(1284);
  const [ms, setMs] = useState(42);
  useEffect(() => {
    const id = window.setInterval(() => {
      setTps((v) => Math.max(900, Math.min(2400, v + Math.round((Math.random() - 0.5) * 180))));
      setMs(() => 32 + Math.round(Math.random() * 22));
    }, 1100);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] sm:gap-3 sm:tracking-[0.18em]">
      <span className="inline-flex items-center gap-1.5 text-primary-glow">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-glow" />
        </span>
        Live
      </span>
      <span className="hidden text-muted-foreground sm:inline">
        <span className="tabular-nums text-foreground">{tps.toLocaleString()}</span> tps
      </span>
      <span className="text-muted-foreground">
        p99 <span className="tabular-nums text-foreground">{ms}ms</span>
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STAT BLOCK
   ──────────────────────────────────────────────────────────────── */

function Stat({
  value,
  label,
  variant,
  delay = 0,
}: {
  value: string;
  label: string;
  variant: "danger" | "success";
  delay?: number;
}) {
  const tone =
    variant === "danger"
      ? "border-destructive/25 bg-destructive/5"
      : "border-primary/30 bg-primary/10";
  const accent = variant === "danger" ? "text-destructive/90" : "text-primary-glow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className={`relative overflow-hidden rounded-2xl border ${tone} p-2 sm:p-2.5 lg:p-3`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            variant === "success"
              ? "linear-gradient(90deg, transparent, var(--color-primary-glow), transparent)"
              : "linear-gradient(90deg, transparent, var(--color-destructive), transparent)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.6, delay: delay + 0.1, ease: "easeInOut" }}
      />
      <div className={`font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em] ${accent}`}>◆</div>
      <div className="mt-0.5 break-words font-display text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
        {value}
      </div>
      <div className="mt-0.5 break-words text-[9px] font-mono uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:text-[10px] sm:tracking-[0.14em]">
        {label}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE FLOWCHART — animated SVG with traveling data packets
   ──────────────────────────────────────────────────────────────── */

function FlowChart({ steps }: { steps: Step[] }) {
  // 6 nodes laid out on a 320 x 460 grid (vw-units scale via viewBox)
  // 0: Ingress, 1: step[0], 2: step[1], 3: step[2], 4: Ledger, 5: Notify
  const labels = [
    "Ingress · Webhook",
    steps[0]?.label ?? "Validate",
    steps[1]?.label ?? "Transform",
    steps[2]?.label ?? "Commit",
    "Ledger · Posted",
    "Notify · Receipt",
  ];

  // node positions { x, y } on a 320x320 viewBox
  const N = [
    { x: 160, y: 36 }, // 0 ingress
    { x: 160, y: 96 }, // 1
    { x: 160, y: 156 }, // 2
    { x: 160, y: 216 }, // 3
    { x: 74, y: 284 }, // 4 ledger (branch)
    { x: 246, y: 284 }, // 5 notify (branch)
  ];

  // edges between nodes (curved)
  const edges = [
    { from: 0, to: 1, d: "M160 54 L160 78" },
    { from: 1, to: 2, d: "M160 114 L160 138" },
    { from: 2, to: 3, d: "M160 174 L160 198" },
    { from: 3, to: 4, d: "M160 234 C 160 258, 110 270, 74 274" },
    { from: 3, to: 5, d: "M160 234 C 160 258, 210 270, 246 274" },
  ];

  const packetTracks = [
    { x: [160, 160], y: [54, 78] },
    { x: [160, 160], y: [114, 138] },
    { x: [160, 160], y: [174, 198] },
    { x: [160, 150, 110, 74], y: [234, 254, 268, 274] },
    { x: [160, 170, 210, 246], y: [234, 254, 268, 274] },
  ];

  // node activation cycle — loops forever
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
    let i = 0;
    const total = 6;
    const id = window.setInterval(() => {
      i = (i + 1) % (total + 1); // +1 = brief "complete" pause
      setActive(i >= total ? -1 : i);
    }, 700);
    return () => window.clearInterval(id);
  }, [steps]);

  return (
    <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 p-3 backdrop-blur sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex min-w-0 items-center gap-2">
          <Radio className="h-3.5 w-3.5 shrink-0 text-primary-glow" />
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Live flow graph
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-glow">
          <Cpu className="h-3 w-3" />
          DAG · v3
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-[color-mix(in_oklab,var(--color-background)_70%,transparent)] p-2">
        {/* faint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg
          viewBox="0 0 320 320"
          className="relative block aspect-[320/320] h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="edge-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-glow)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="packet-grad">
              <stop offset="0%" stopColor="var(--color-primary-glow)" stopOpacity="1" />
              <stop offset="60%" stopColor="var(--color-primary-glow)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 L2.5 5 Z" fill="var(--color-primary-glow)" />
            </marker>
            <marker
              id="arrowhead-dim"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="4.5"
              markerHeight="4.5"
              orient="auto-start-reverse"
            >
              <path
                d="M0 0 L10 5 L0 10 L2.5 5 Z"
                fill="color-mix(in oklab, var(--color-primary) 45%, transparent)"
              />
            </marker>
          </defs>

          {/* edges */}
          {edges.map((e, i) => {
            const lit = active >= e.to || active === -1;
            return (
              <g key={i}>
                <path
                  d={e.d}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <motion.path
                  d={e.d}
                  fill="none"
                  stroke="url(#edge-grad)"
                  strokeWidth={lit ? 2 : 1.2}
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                  strokeDashoffset={0}
                  opacity={lit ? 0.95 : 0.35}
                  filter={lit ? "url(#glow)" : undefined}
                  markerEnd={lit ? "url(#arrowhead)" : "url(#arrowhead-dim)"}
                  style={{
                    transition: "opacity 400ms ease, stroke-width 400ms ease",
                  }}
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
                {/* traveling packet */}
                <motion.circle
                  r="4"
                  fill="url(#packet-grad)"
                  filter="url(#glow)"
                  animate={{
                    cx: packetTracks[i].x,
                    cy: packetTracks[i].y,
                    opacity: [0, 1, 1, 0],
                    scale: [0.7, 1.25, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.65,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.24,
                  }}
                />
              </g>
            );
          })}

          {/* nodes */}
          {N.map((p, i) => {
            const isActive = active === i;
            const isDone = active === -1 || active > i;
            const isBranch = i === 4 || i === 5;
            const w = isBranch ? 140 : 188;
            const h = 40;
            return (
              <g
                key={i}
                transform={`translate(${p.x - w / 2} ${p.y - h / 2})`}
                style={{ transition: "transform 300ms ease" }}
              >
                {/* halo */}
                {isActive && (
                  <rect
                    x={-6}
                    y={-6}
                    rx={14}
                    ry={14}
                    width={w + 12}
                    height={h + 12}
                    fill="none"
                    stroke="var(--color-primary-glow)"
                    strokeWidth={1.5}
                    opacity={0.6}
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.8;0.2"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
                <rect
                  width={w}
                  height={h}
                  rx={10}
                  ry={10}
                  fill={
                    isActive
                      ? "color-mix(in oklab, var(--color-primary) 28%, var(--color-card))"
                      : isDone
                        ? "color-mix(in oklab, var(--color-primary) 12%, var(--color-card))"
                        : "var(--color-card)"
                  }
                  stroke={
                    isActive || isDone
                      ? "color-mix(in oklab, var(--color-primary-glow) 65%, transparent)"
                      : "var(--color-border)"
                  }
                  strokeWidth={1.25}
                  style={{ transition: "fill 350ms ease, stroke 350ms ease" }}
                />
                {/* status dot */}
                <circle
                  cx={12}
                  cy={h / 2}
                  r={3.5}
                  fill={
                    isActive
                      ? "var(--color-primary-glow)"
                      : isDone
                        ? "var(--color-primary)"
                        : "color-mix(in oklab, var(--color-muted-foreground) 50%, transparent)"
                  }
                >
                  {isActive && (
                    <animate attributeName="r" values="3;5;3" dur="0.9s" repeatCount="indefinite" />
                  )}
                </circle>
                <text
                  x={26}
                  y={h / 2 + 4}
                  fontSize={isBranch ? 10 : 10.5}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={
                    isActive || isDone ? "var(--color-foreground)" : "var(--color-muted-foreground)"
                  }
                  style={{ transition: "fill 300ms ease" }}
                >
                  {(() => {
                    const max = isBranch ? 11 : 19;
                    const t = labels[i];
                    return t.length > max ? t.slice(0, max - 1) + "…" : t;
                  })()}
                </text>
                {/* tag */}
                <text
                  x={w - 8}
                  y={h / 2 + 3.5}
                  textAnchor="end"
                  fontSize={8.5}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={
                    isActive || isDone
                      ? "var(--color-primary-glow)"
                      : "color-mix(in oklab, var(--color-muted-foreground) 70%, transparent)"
                  }
                >
                  {i === 0 ? "IN" : i === 4 ? "DB" : i === 5 ? "SMS" : `S${i}`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* status bar */}
      <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Zap className="h-3 w-3 text-primary-glow" />
          {active === -1 ? "Cycle complete · re-arming" : `Executing node ${active + 1}/6`}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">
          <CheckCircle2 className="h-3 w-3" />
          {active === -1 ? "OK" : "Streaming"}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CONVERSION FOOTER
   ──────────────────────────────────────────────────────────────── */

function ConversionFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative mt-10 overflow-hidden rounded-3xl border border-primary/30 p-6 sm:mt-12 sm:p-8"
      style={{
        background:
          "linear-gradient(120deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-card)) 0%, var(--color-card) 60%, color-mix(in oklab, var(--color-primary-glow) 10%, var(--color-card)) 100%)",
        boxShadow: "var(--shadow-emerald)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(600px 200px at 100% 0%, color-mix(in oklab, var(--color-primary-glow) 35%, transparent), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-glow">
            Architecture Discovery · 30 min · free
          </p>
          <h3 className="mt-2 text-balance font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            See your own bottleneck modeled by a Boafo principal engineer.
          </h3>
        </div>
        <MagneticButton />
      </div>
    </motion.div>
  );
}

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.35 });
  };

  return (
    <motion.span
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        to="/contact"
        onMouseMove={onMove}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        style={{
          background: "var(--gradient-electric)",
          boxShadow:
            "0 10px 30px -10px color-mix(in oklab, var(--color-primary) 70%, transparent), inset 0 1px 0 color-mix(in oklab, white 25%, transparent)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative">Book Architecture Discovery</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.span>
  );
}
