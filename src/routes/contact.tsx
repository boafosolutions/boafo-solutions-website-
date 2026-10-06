import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { AiSummary, BOAFO_CORE_SERVICES, BOAFO_INDUSTRIES, BOAFO_LOCATION, BOAFO_CONTACT } from "@/components/AiSummary";

const CALENDLY_URL =
  "https://calendly.com/boafosolutions/30min?hide_gdpr_banner=1&background_color=0b0f14&text_color=e2e8f0&primary_color=22d3ee";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — M-Pesa Integration Developers | Boafo Solutions" },
      {
        name: "description",
        content:
          "Talk to M-Pesa integration developers. Boafo Solutions — Ngong 5th Ave, Upperhill, Nairobi. Book a 30-minute architecture discovery. WhatsApp 0737 575 156.",
      },
      {
        name: "keywords",
        content:
          "contact Boafo Solutions, M-Pesa integration developers, custom software company Kenya, enterprise software Nairobi, web portal developers contact",
      },
      { property: "og:title", content: "Contact Boafo Solutions" },
      {
        property: "og:description",
        content:
          "Book a 30-minute architecture discovery with Boafo Solutions, custom software developers in Nairobi.",
      },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.boafosolutions.com/contact" },
      { property: "og:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.boafosolutions.com/boafo-logo-dark.svg" },
    ],
    links: [{ rel: "canonical", href: "https://www.boafosolutions.com/contact" }],
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
                { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.boafosolutions.com/contact" },
              ],
            },
            {
              "@type": "ContactPage",
              "@id": "https://www.boafosolutions.com/contact#webpage",
              url: "https://www.boafosolutions.com/contact",
              name: "Contact Boafo Solutions",
              about: { "@id": "https://www.boafosolutions.com/#organization" },
              inLanguage: "en",
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://www.boafosolutions.com/#localbusiness",
              name: "Boafo Solutions",
              url: "https://www.boafosolutions.com/contact",
              image: "https://www.boafosolutions.com/boafo-logo-dark.svg",
              telephone: "+254737575156",
              email: "info@boafosolutions.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ngong 5th Avenue",
                addressLocality: "Upperhill",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
              geo: { "@type": "GeoCoordinates", latitude: -1.2998, longitude: 36.8148 },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/boafosolutions",
                "https://twitter.com/boafosolutions",
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST = [
  "Senior engineer, not a sales rep",
  "Fixed-price scope, no surprises",
  "Full source ownership at delivery",
  "Ongoing support after launch",
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[820px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      <SiteNav />

      <main className="pt-28 sm:pt-32 pb-32 lg:pb-24">
        <AiSummary
          title="Contact Boafo Solutions"
          summary="Talk to a senior engineer at Boafo Solutions. We respond to new business inquiries the same business day, support tickets within 4 hours during business hours (EAT), and escalate critical production issues immediately. Book a 30-minute architecture discovery, send a detailed inquiry, or reach us by email, phone, or WhatsApp."
          services={BOAFO_CORE_SERVICES}
          industries={BOAFO_INDUSTRIES}
          location={BOAFO_LOCATION}
          contact={BOAFO_CONTACT}
          faqs={[
            { q: "How do I contact Boafo Solutions?", a: "Email info@boafosolutions.com, call or WhatsApp +254 737 575 156, or book a 30-minute architecture discovery from the Contact page." },
            { q: "Where is your office?", a: "Ngong 5th Avenue, Upperhill, Nairobi, Kenya. Office hours are Monday–Friday, 09:00–18:00 EAT." },
            { q: "How fast will you reply?", a: "Same business day for new inquiries, within 4 hours for support tickets during business hours, immediate for critical production issues." },
          ]}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ───── HERO HEADER ───── */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-10 flex max-w-3xl flex-col gap-5 sm:mb-14"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Architecture Discovery
            </span>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tell us where the{" "}
              <span className="text-gradient">friction</span> lives.
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              One 30-minute call with a senior engineer. We diagnose your
              primary bottleneck and return a clear, fixed-price architecture
              plan — no pressure, no jargon.
            </p>
          </motion.header>

          {/* ───── BENTO ───── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-6">
            {/* Side rail: contact info + trust */}
            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="md:col-span-4 flex flex-col gap-4 lg:gap-6"
            >
              {/* Contact rail tile */}
              <div className="flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-border bg-card/60 p-8 backdrop-blur shadow-md transition-colors hover:border-primary/40">
                <div className="flex flex-col gap-7">
                  <ContactRow
                    label="Email"
                    icon={<Mail className="h-3.5 w-3.5" />}
                    value="info@boafosolutions.com"
                    href="mailto:info@boafosolutions.com"
                  />
                  <ContactRow
                    label="Phone / WhatsApp"
                    icon={<Phone className="h-3.5 w-3.5" />}
                    value="+254 737 575 156"
                    href="tel:+254737575156"
                  />
                  <ContactRow
                    label="NBO Office"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    value="Ngong 5th Ave, Upperhill"
                  />
                </div>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="flex items-center gap-2">
                    <span className="relative grid h-2.5 w-2.5 place-items-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                      <span className="relative h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Available for new engagements
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust signals tile */}
              <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.06] p-8 backdrop-blur">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                  Why teams choose us
                </p>
                <ul className="space-y-4">
                  {TRUST.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-foreground/85"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>

            {/* Path 1: Calendly */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="md:col-span-4 flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card/60 backdrop-blur shadow-md transition-colors hover:border-primary/40"
            >
              <header className="flex items-center justify-between border-b border-border/60 p-6">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                    Option 01 · Fastest path
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                    Book a discovery
                  </h2>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
              </header>
              <div className="flex-grow p-3 sm:p-4">
                <CalendlyEmbed url={CALENDLY_URL} minHeight={520} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>30 mins · Google Meet</span>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  New tab <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.section>

            {/* Path 2: Inquiry form */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="md:col-span-4 flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card/60 backdrop-blur shadow-md transition-colors hover:border-primary/40"
            >
              <header className="flex items-center justify-between border-b border-border/60 p-6">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Option 02 · Send a brief
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                    Detailed inquiry
                  </h2>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-muted text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
              </header>
              <div className="flex-grow p-6">
                <ContactForm />
              </div>
            </motion.section>
          </div>

          {/* ───── SEO BENTO — Working with Boafo ───── */}
          <section className="mt-20 sm:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-10 max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Working with Boafo
              </span>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                What to expect <span className="text-gradient">when you contact us.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Every inquiry is reviewed by a senior engineer. Below: the most
                common reasons to reach out, our response commitments, and
                answers to frequently asked questions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:gap-6">
              <ContentCard className="md:col-span-3" eyebrow="01" title="Contact Overview">
                <p>
                  Boafo Solutions is a custom software company and digital
                  transformation consultancy helping enterprises across Kenya,
                  Africa, and global markets. Whether you need web development
                  services, mobile app development, M-Pesa integration,
                  enterprise software solutions, or IT consulting, our senior
                  team is ready to advise. This page is the fastest way to{" "}
                  <strong className="text-foreground">contact Boafo Solutions</strong>{" "}
                  — book a discovery call, send a detailed inquiry, or reach us
                  on WhatsApp.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-3" eyebrow="02" title="How We Can Help">
                <p>
                  Our team supports the full software lifecycle, from
                  architecture to long-term operations. When you contact us,
                  you can discuss:
                </p>
                <ul>
                  <li>Custom software and web application development</li>
                  <li>Native and cross-platform mobile app development</li>
                  <li>M-Pesa, Daraja API, and payment workflow integration</li>
                  <li>Enterprise solutions, ERP connectors, and cloud infrastructure</li>
                  <li>IT consulting and digital transformation strategy</li>
                  <li>Ongoing support, monitoring, and feature improvements</li>
                </ul>
              </ContentCard>

              <ContentCard className="md:col-span-2" eyebrow="03" title="Business Inquiries">
                <p>
                  For new project requests, software procurement, and strategic
                  architecture reviews, email our enterprise solutions team or
                  book a 30-minute architecture discovery. We prepare a one-page
                  technical brief, a fixed-price scope, and a realistic delivery
                  plan.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-2" eyebrow="04" title="Support & Customer Service">
                <p>
                  Existing clients can contact our{" "}
                  <strong className="text-foreground">software company support</strong>{" "}
                  team for bug reports, feature requests, infrastructure
                  monitoring, and SLA questions. Support requests are routed
                  directly to the engineer who knows your platform.
                </p>
                <p>
                  For urgent production issues, WhatsApp or phone is the
                  fastest channel.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-2" eyebrow="05" title="Partnership Opportunities">
                <p>
                  We actively collaborate with technology partners, agencies,
                  and independent consultants across East Africa, Europe, and
                  North America. Partners gain direct access to our engineering
                  leadership and transparent commercial terms.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-3" eyebrow="06" title="Response Time Expectations">
                <p>We respect your time. Our response commitments are:</p>
                <ul>
                  <li>New business inquiries: same business day</li>
                  <li>Support tickets: within 4 hours during business hours (EAT)</li>
                  <li>Critical production issues: immediate escalation</li>
                  <li>Partnership requests: within two business days</li>
                </ul>
                <p>
                  Messages received outside business hours are queued and
                  answered at the start of the next working day.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-3" eyebrow="07" title="Office & Remote Availability">
                <p>
                  Our headquarters are on Ngong 5th Avenue in Upperhill,
                  Nairobi, and we operate a remote-first delivery model across
                  Kenya and international time zones. We combine the
                  responsiveness of a local software company with the scale of
                  a distributed engineering team.
                </p>
                <p>
                  In-person architecture workshops and executive briefings are
                  available in Nairobi by appointment.
                </p>
              </ContentCard>

              <ContentCard className="md:col-span-6" eyebrow="08" title="Frequently Asked Questions">
                <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Faq q="What happens after I submit the contact form?">
                    A senior engineer reviews your request, follows up within
                    one business day, and schedules a free 30-minute
                    architecture discovery if relevant.
                  </Faq>
                  <Faq q="Do you work with international clients?">
                    Yes. We serve clients in Kenya, Uganda, Tanzania, Rwanda,
                    the United Kingdom, the United States, and the Middle East.
                  </Faq>
                  <Faq q="Can I receive a fixed-price quote?">
                    Yes. After the discovery call we deliver a fixed-price
                    architecture plan and a milestone-based delivery schedule.
                  </Faq>
                  <Faq q="Do you sign NDAs before discussing sensitive systems?">
                    Absolutely. We routinely sign non-disclosure agreements
                    before reviewing proprietary data or systems.
                  </Faq>
                </dl>
              </ContentCard>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile sticky quick-contact rail */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 divide-x divide-border/60">
          <QuickAction
            href="https://wa.me/254737575156"
            label="WhatsApp"
            icon={<MessageCircle className="h-4 w-4" />}
            external
          />
          <QuickAction
            href="tel:+254737575156"
            label="Call"
            icon={<Phone className="h-4 w-4" />}
          />
          <QuickAction
            href="mailto:info@boafosolutions.com"
            label="Email"
            icon={<Mail className="h-4 w-4" />}
          />
        </div>
      </div>

      <div className="pb-16 lg:pb-0" />
      <SiteFooter />
    </div>
  );
}

/* ───── helpers ───── */
function ContactRow({
  label,
  icon,
  value,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <p className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-primary/70">{icon}</span>
        {label}
      </p>
      <p className="text-base text-foreground sm:text-lg">{value}</p>
    </>
  );
  return href ? (
    <a href={href} className="group block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function ContentCard({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`group flex h-full flex-col rounded-[1.75rem] border border-border bg-card/60 p-6 backdrop-blur shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">
          {eyebrow}
        </span>
        <span className="h-px flex-1 ml-4 bg-border/60" />
      </div>
      <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        {title}
      </h3>
      <div className="prose prose-sm max-w-none flex-1 space-y-3 text-muted-foreground [&_li]:marker:text-primary/60 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </article>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {q}
      </dt>
      <dd className="text-sm text-muted-foreground sm:text-base">{children}</dd>
    </div>
  );
}

function QuickAction({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
    >
      {icon}
      {label}
    </a>
  );
}
