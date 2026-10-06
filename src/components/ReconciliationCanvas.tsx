import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Building2,
  Zap,
  Truck,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

type Scenario = {
  id: string;
  industry: string;
  icon: typeof Smartphone;
  problem: {
    title: string;
    detail: string;
    metrics: { label: string; value: string; tone: "bad" }[];
  };
  solution: {
    title: string;
    detail: string;
    metrics: { label: string; value: string; tone: "good" }[];
    steps: string[];
  };
};

const SCENARIOS: Scenario[] = [
  {
    id: "mpesa",
    industry: "Retail / SACCO",
    icon: Smartphone,
    problem: {
      title: "Accountant hunts M-Pesa payments in a WhatsApp group",
      detail:
        "Customers pay via Paybill, send screenshots, and your team types each one into Excel. Reconciliation closes 4 days late, and KES 80k goes missing every month.",
      metrics: [
        { label: "Time per day", value: "3.5 hrs", tone: "bad" },
        { label: "Monthly leakage", value: "~KES 80k", tone: "bad" },
        { label: "Close delay", value: "+4 days", tone: "bad" },
      ],
    },
    solution: {
      title: "Auto-reconciled Daraja ledger with instant SMS receipts",
      detail:
        "Boafo plugs into Daraja C2B, matches every transaction to an invoice, posts it to your ledger, and texts the customer a branded receipt — all in under 2 seconds.",
      metrics: [
        { label: "Time per day", value: "0 min", tone: "good" },
        { label: "Match rate", value: "99.7%", tone: "good" },
        { label: "Close delay", value: "Live", tone: "good" },
      ],
      steps: [
        "Daraja callback received",
        "Matched to invoice #INV-2041",
        "Posted to ledger · SMS sent",
      ],
    },
  },
  {
    id: "property",
    industry: "Real Estate",
    icon: Building2,
    problem: {
      title: "Tenants chase caretakers for rent statements on WhatsApp",
      detail:
        "Caretakers manually compute rent + water + service fees in a notebook. Disputes pile up, tenants delay rent, and quarterly board reports take a week to build.",
      metrics: [
        { label: "Late rent", value: "38%", tone: "bad" },
        { label: "Disputes / mo", value: "22", tone: "bad" },
        { label: "Report build", value: "7 days", tone: "bad" },
      ],
    },
    solution: {
      title: "Tenant portal with prorated billing & board-ready dashboards",
      detail:
        "Each tenant logs in, sees a clean statement, pays via M-Pesa STK push, and downloads receipts. The board sees occupancy, arrears, and yield in real time.",
      metrics: [
        { label: "Late rent", value: "9%", tone: "good" },
        { label: "Disputes / mo", value: "2", tone: "good" },
        { label: "Report build", value: "Instant", tone: "good" },
      ],
      steps: [
        "Tenant statement generated",
        "STK push paid · receipt emailed",
        "Board dashboard refreshed",
      ],
    },
  },
  {
    id: "energy",
    industry: "Solar / Utilities",
    icon: Zap,
    problem: {
      title: "Field engineers read smart meters and email PDFs back to HQ",
      detail:
        "Meters report in different formats. Billing runs once a month from a spreadsheet, customers complain about wrong units, and the CFO has no live view of consumption.",
      metrics: [
        { label: "Meter errors", value: "12%", tone: "bad" },
        { label: "Billing cycle", value: "30 days", tone: "bad" },
        { label: "Site visits", value: "4 / mo", tone: "bad" },
      ],
    },
    solution: {
      title: "IoT telemetry pipeline with prepaid token vending",
      detail:
        "Boafo unifies every meter brand into one feed, vends tokens via M-Pesa, and gives the CFO a live consumption map across all sites.",
      metrics: [
        { label: "Meter errors", value: "0.3%", tone: "good" },
        { label: "Billing cycle", value: "Realtime", tone: "good" },
        { label: "Site visits", value: "0", tone: "good" },
      ],
      steps: [
        "Meter reading ingested · MQTT",
        "Token vended via Daraja",
        "Consumption map updated",
      ],
    },
  },
  {
    id: "logistics",
    industry: "Logistics / Distribution",
    icon: Truck,
    problem: {
      title: "Dispatch tracks 40 boda riders via phone calls and screenshots",
      detail:
        "No live view of where stock is. Riders argue over commissions, customers call for ETAs, and stock-outs at outlying shops cost 3 sales a week.",
      metrics: [
        { label: "Stock-outs", value: "12 / wk", tone: "bad" },
        { label: "ETA accuracy", value: "44%", tone: "bad" },
        { label: "Commission rows", value: "Daily", tone: "bad" },
      ],
    },
    solution: {
      title: "Dispatch console with live GPS, auto-commissions & customer ETAs",
      detail:
        "Riders use a lightweight Android PWA. Dispatch sees every drop, customers get an SMS link with live ETA, and commissions calculate themselves.",
      metrics: [
        { label: "Stock-outs", value: "1 / wk", tone: "good" },
        { label: "ETA accuracy", value: "96%", tone: "good" },
        { label: "Commission rows", value: "Auto", tone: "good" },
      ],
      steps: [
        "Rider accepted drop · GPS live",
        "Customer SMS with tracking link",
        "Commission auto-posted",
      ],
    },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ReconciliationCanvas() {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const [autoplay, setAutoplay] = useState(true);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  // Auto-cycle every 6s until the user clicks
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      const idx = SCENARIOS.findIndex((s) => s.id === activeId);
      setActiveId(SCENARIOS[(idx + 1) % SCENARIOS.length].id);
    }, 6000);
    return () => clearTimeout(t);
  }, [activeId, autoplay]);

  const handlePick = (id: string) => {
    setAutoplay(false);
    setActiveId(id);
  };

  return (
    <div className="solid-card relative overflow-hidden p-5 sm:p-8">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 -z-0 h-96 w-96 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-mint)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -z-0 h-96 w-96 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-electric)" }}
      />

      {/* Header */}
      <div className="relative mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-primary">
            Live Operations Simulator · {active.industry}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Pick a real business pain. Watch Boafo dissolve it.
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {autoplay ? "Autoplaying" : "You're driving"}
        </span>
      </div>

      {/* Scenario picker */}
      <div
        role="tablist"
        aria-label="Business scenarios"
        className="relative mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {SCENARIOS.map((s) => {
          const isActive = s.id === activeId;
          return (
            <motion.button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePick(s.id)}
              className={`relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                isActive
                  ? "border-primary/55 bg-primary/12 text-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:border-primary/35 hover:text-foreground"
              }`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition-colors ${
                  isActive
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border bg-background/60 text-muted-foreground"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">{s.industry}</span>
              {isActive && (
                <motion.span
                  layoutId="scenario-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Problem → Engine → Solution */}
      <div className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        {/* PROBLEM */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`problem-${activeId}`}
            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative rounded-2xl border border-destructive/30 bg-destructive/5 p-5"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-destructive/40 bg-destructive/15 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-destructive">
                Before · The Problem
              </p>
            </div>
            <h4 className="mt-3 text-sm font-semibold leading-snug text-foreground sm:text-base">
              {active.problem.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              {active.problem.detail}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {active.problem.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE }}
                  className="rounded-lg border border-destructive/25 bg-background/40 p-2"
                >
                  <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-destructive">
                    {m.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ENGINE */}
        <div className="relative flex items-center justify-center py-4 md:py-0">
          <svg
            aria-hidden
            className="absolute left-0 top-1/2 hidden h-px w-[calc(50%-2.25rem)] -translate-y-1/2 md:block"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="oklch(0.78 0.17 162 / 0.4)" strokeDasharray="3 3" />
          </svg>
          <svg
            aria-hidden
            className="absolute right-0 top-1/2 hidden h-px w-[calc(50%-2.25rem)] -translate-y-1/2 md:block"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="oklch(0.78 0.17 162 / 0.4)" strokeDasharray="3 3" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.span
              key={`packet-${activeId}`}
              initial={{ x: -90, opacity: 0 }}
              animate={{ x: 90, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_oklch(0.78_0.17_162/0.9)] md:block"
              aria-hidden
            />
          </AnimatePresence>

          <motion.div
            key={`engine-${activeId}`}
            initial={{ scale: 0.92, rotate: -3 }}
            animate={{ scale: [0.92, 1.06, 1], rotate: [-3, 2, 0] }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative grid h-20 w-20 place-items-center rounded-2xl border border-primary/40 bg-background/60 backdrop-blur-sm sm:h-24 sm:w-24"
            style={{ boxShadow: "var(--shadow-emerald)" }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-2xl"
              style={{ background: "var(--gradient-electric)", opacity: 0.18 }}
              animate={{ opacity: [0.12, 0.28, 0.12] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-2xl border border-primary/50"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <Cpu className="relative h-7 w-7 text-primary sm:h-8 sm:w-8" />
            <span className="absolute -bottom-7 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Boafo Engine
            </span>
          </motion.div>
        </div>

        {/* SOLUTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`solution-${activeId}`}
            initial={{ opacity: 0, x: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative rounded-2xl border border-primary/35 bg-primary/8 p-5"
            style={{ boxShadow: "var(--shadow-emerald)" }}
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/40 bg-primary/15 text-primary">
                <TrendingUp className="h-4 w-4" />
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                After · Boafo Ships
              </p>
            </div>
            <h4 className="mt-3 text-sm font-semibold leading-snug text-foreground sm:text-base">
              {active.solution.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              {active.solution.detail}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {active.solution.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: EASE }}
                  className="rounded-lg border border-primary/30 bg-background/40 p-2"
                >
                  <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-primary">
                    {m.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Steps stream */}
            <div className="mt-4 space-y-1.5">
              {active.solution.steps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.18, duration: 0.4, ease: EASE }}
                  className="flex items-center gap-2 rounded-md border border-primary/20 bg-background/40 px-2.5 py-1.5 text-[11px] text-muted-foreground"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
                  <span className="font-mono">{step}</span>
                  <Clock className="ml-auto h-3 w-3 text-primary/60" />
                  <span className="font-mono text-[10px] text-primary/80">
                    {(0.4 + i * 0.3).toFixed(1)}s
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA strip */}
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          See your own bottleneck modelled —{" "}
          <span className="text-foreground/90">free 30-min architecture call.</span>
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/25"
        >
          Book it
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
