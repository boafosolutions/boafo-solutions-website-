import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Cpu, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Blueprint = {
  title: string;
  summary: string;
  stack: string[];
  workflow: string[];
  outcomes: string[];
};

const QUICK_PROMPTS = [
  "M-Pesa reconciliation is too manual",
  "Tenants chase us for rent statements",
  "Field engineers email meter readings as PDFs",
];

const EASE = [0.16, 1, 0.3, 1] as const;

function deriveBlueprint(input: string): Blueprint {
  const q = input.toLowerCase();

  if (q.includes("mpesa") || q.includes("m-pesa") || q.includes("paybill") || q.includes("reconcil")) {
    return {
      title: "Auto-Reconciled M-Pesa Ledger",
      summary:
        "Boafo connects your Paybill directly to a custom ledger dashboard, matches every transaction to an invoice, and texts the customer a branded receipt — closing your books in real time.",
      stack: ["Safaricom Daraja C2B", "Next.js Ledger Dashboard", "Postgres + RBAC", "SMS Notifications"],
      workflow: [
        "Daraja callback ingested & validated",
        "Auto-matched to open invoice (99.7%)",
        "Posted to ledger · branded SMS sent",
      ],
      outcomes: ["~KES 80k / mo leakage recovered", "0 min/day on reconciliation", "Live close, not month-end"],
    };
  }

  if (q.includes("tenant") || q.includes("rent") || q.includes("property") || q.includes("landlord")) {
    return {
      title: "Tenant Self-Service Property Portal",
      summary:
        "A clean tenant portal with prorated statements, STK-push rent payments, automatic receipts, and a board-ready dashboard for occupancy, arrears, and yield.",
      stack: ["Next.js Tenant Portal", "M-Pesa STK Push", "Role-based caretaker console", "Live board dashboards"],
      workflow: [
        "Tenant statement auto-generated",
        "Pays via STK push · receipt emailed",
        "Board metrics refreshed in real time",
      ],
      outcomes: ["Late rent: 38% → 9%", "Disputes: 22 → 2 per month", "Quarterly reports built instantly"],
    };
  }

  if (q.includes("meter") || q.includes("energy") || q.includes("solar") || q.includes("iot") || q.includes("utility")) {
    return {
      title: "Unified IoT Telemetry & Token Vending",
      summary:
        "Boafo unifies every meter brand into a single telemetry feed, vends prepaid tokens via M-Pesa, and gives the CFO a live consumption map across all sites.",
      stack: ["MQTT ingestion gateway", "Token vending service", "Daraja STK", "Live consumption map"],
      workflow: [
        "Meter reading ingested via MQTT",
        "Token vended on M-Pesa payment",
        "Consumption map updated live",
      ],
      outcomes: ["Meter errors: 12% → 0.3%", "Billing cycle: 30 days → realtime", "Zero monthly site visits"],
    };
  }

  if (q.includes("whatsapp") || q.includes("excel") || q.includes("spreadsheet") || q.includes("manual")) {
    return {
      title: "Role-Based Operations Console",
      summary:
        "Replace WhatsApp groups and shared Excel sheets with a single role-based console — field agents log updates, accountants reconcile, executives see the live picture.",
      stack: ["Next.js + RBAC", "Postgres row-level security", "Activity audit log", "Live executive dashboard"],
      workflow: [
        "Field agent logs event from phone",
        "Accountant validates & posts",
        "Executive sees it on the dashboard",
      ],
      outcomes: ["No more screenshots in chats", "Full audit trail of every action", "Decisions backed by live data"],
    };
  }

  // Generic fallback
  return {
    title: "Custom Workflow Automation",
    summary:
      "Boafo maps your current manual workflow, identifies the high-friction nodes, and ships a tailored Next.js system that automates the boring parts end-to-end.",
    stack: ["Next.js + TypeScript", "Postgres + RBAC", "Integration layer (M-Pesa, SMS, ERP)", "Live reporting dashboard"],
    workflow: [
      "Discovery: map your real workflow",
      "Build: ship in 4–8 week sprints",
      "Operate: monitor, iterate, support",
    ],
    outcomes: ["Manual hours reclaimed weekly", "One source of truth for ops", "Reports your CFO will actually open"],
  };
}

export function AISimulator() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "analyzing" | "result">("idle");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

  const run = (q: string) => {
    if (!q.trim()) return;
    setInput(q);
    setPhase("analyzing");
    setBlueprint(null);
    setTimeout(() => {
      setBlueprint(deriveBlueprint(q));
      setPhase("result");
    }, 1100);
  };

  const reset = () => {
    setInput("");
    setPhase("idle");
    setBlueprint(null);
  };

  return (
    <div className="solid-card relative overflow-hidden p-5 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-electric)" }}
      />

      {/* Header */}
      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" />
            AI Solution Simulator
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            What manual process do you want to automate today?
          </h3>
        </div>
        {phase === "result" && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Try another
          </button>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
        className="relative mt-5"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/70 p-1.5 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. We track rider commissions on WhatsApp…"
            aria-label="Describe a manual business process"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || phase === "analyzing"}
            className="btn-mint inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold disabled:opacity-60"
          >
            {phase === "analyzing" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Analyze
          </button>
        </div>
      </form>

      {/* Quick prompts */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => run(p)}
            className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:bg-background"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Output area */}
      <div className="relative mt-5 min-h-[260px]">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/30 p-6 text-center"
            >
              <Cpu className="h-6 w-6 text-primary" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Your Boafo Architecture Blueprint appears here.
              </p>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                Type a real bottleneck or pick a quick prompt above. We'll draft
                the stack, workflow, and expected outcomes in seconds.
              </p>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-6"
            >
              <motion.div
                className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/40 bg-background/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="h-5 w-5 text-primary" />
              </motion.div>
              <p className="mt-4 text-sm font-medium text-foreground">Analyzing your workflow…</p>
              <div className="mt-3 space-y-1.5 text-[11px] font-mono text-muted-foreground">
                {["Parsing input", "Matching patterns", "Drafting blueprint"].map((s, i) => (
                  <motion.p
                    key={s}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.25, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {s}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "result" && blueprint && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="rounded-2xl border border-primary/30 bg-background/60 p-5"
              style={{ boxShadow: "var(--shadow-emerald)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    Boafo Architecture Blueprint
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                    {blueprint.title}
                  </h4>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary">
                  Ready
                </span>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {blueprint.summary}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <BlueprintBlock label="Stack" items={blueprint.stack} />
                <BlueprintBlock label="Workflow" items={blueprint.workflow} numbered />
                <BlueprintBlock label="Outcomes" items={blueprint.outcomes} check />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2">
                <p className="text-[11px] text-muted-foreground">
                  Like the shape of it? Let's scope it properly.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/25"
                >
                  Initiate Discovery
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BlueprintBlock({
  label,
  items,
  numbered,
  check,
}: {
  label: string;
  items: string[];
  numbered?: boolean;
  check?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{label}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((it, i) => (
          <li key={it} className="flex items-start gap-1.5 text-[12px] leading-snug text-foreground/90">
            {check ? (
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            ) : numbered ? (
              <span className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-primary/15 text-[9px] font-mono font-bold text-primary">
                {i + 1}
              </span>
            ) : (
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
