import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { sendContactRequest } from "@/lib/contact.functions";

const BOTTLENECKS = [
  "Manual M-Pesa reconciliation",
  "Spreadsheet-driven operations",
  "WhatsApp-based workflows",
  "Disconnected property management",
  "Smart asset / IoT reporting",
  "Custom corporate website",
  "Other",
];

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "");
}

export function ContactForm() {
  const send = useServerFn(sendContactRequest);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    bottleneck: BOTTLENECKS[0],
    message: "",
  });

  const onChange =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const phoneDigits = digitsOnly(form.phone);
    if (phoneDigits.length < 7) {
      toast.error("Please enter a complete phone number with at least 7 digits.");
      return;
    }

    setLoading(true);
    try {
      const result = await send({ data: form });
      if (result.delivered) {
        toast.success(result.message);
      } else {
        toast.success(result.message, { duration: 6000 });
      }
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        bottleneck: BOTTLENECKS[0],
        message: "",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }


  return (
    <form
      onSubmit={onSubmit}
      aria-label="Architecture discovery request form"
      className="space-y-4 rounded-2xl border border-border bg-secondary/40 p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="name" value={form.name} onChange={onChange("name")} />
        <Field label="Company" id="company" value={form.company} onChange={onChange("company")} />
        <Field label="Corporate Email" id="email" type="email" value={form.email} onChange={onChange("email")} />
        <Field label="Phone (WhatsApp)" id="phone" type="tel" value={form.phone} onChange={onChange("phone")} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="bottleneck" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Primary System Bottleneck
        </label>
        <select
          id="bottleneck"
          required
          value={form.bottleneck}
          onChange={onChange("bottleneck")}
          className="w-full rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring"
        >
          {BOTTLENECKS.map((b) => (
            <option key={b} value={b} className="bg-background text-foreground">
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Anything else? <span className="normal-case text-muted-foreground/70">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={onChange("message")}
          placeholder="Optional context — current tools, team size, timeline…"
          className="w-full rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-mint inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Request
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <ShieldCheck className="h-3 w-3 text-primary" /> Your details are kept private
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
