import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BoafoLogo } from "@/components/BoafoLogo";

// Email obfuscation — assembled at runtime to reduce harvesting by scrapers.
const EMAIL_USER = "info";
const EMAIL_DOMAIN = "boafosolutions.com";

function ObfuscatedEmail() {
  const [revealed, setRevealed] = useState(false);
  const address = `${EMAIL_USER}\u0040${EMAIL_DOMAIN}`;

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="text-left hover:text-foreground transition-colors"
        aria-label="Reveal email address"
      >
        {EMAIL_USER}
        <span aria-hidden="true"> [at] </span>
        <span className="sr-only">@</span>
        {EMAIL_DOMAIN}
      </button>
    );
  }

  return (
    <a href={`mailto:${address}`} className="hover:text-foreground transition-colors">
      {address}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BoafoLogo />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Custom web portals, M-Pesa integration, and business automation for
            modern enterprises — built to ease the everyday grind and supported
            for life.
          </p>
          <address className="mt-5 space-y-1.5 text-sm not-italic text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Ngong 5th Avenue, Upperhill
                <br />
                Nairobi, Kenya
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <ObfuscatedEmail />
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+254737575156" className="hover:text-foreground transition-colors">
                0737 575 156
              </a>
            </p>
          </address>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.facebook.com/p/BOAFO-Solutions-No-CRB-Loans-61588373023479/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boafo Solutions on Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://ke.linkedin.com/in/william-atemi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boafo Solutions on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 max-w-md text-xs text-muted-foreground/80">
            Web portal developers · Custom software developers · M-Pesa
            integration developers · Property management software.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            { label: "Work", to: "/work" },
            { label: "Company", to: "/company" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Reach Us"
          links={[{ label: "Contact form", to: "/contact" }]}
          external={[
            { label: "WhatsApp", href: "https://wa.me/254737575156" },
            { label: "Call", href: "tel:+254737575156" },
            { label: "Facebook", href: "https://www.facebook.com/p/BOAFO-Solutions-No-CRB-Loans-61588373023479/" },
            { label: "LinkedIn", href: "https://ke.linkedin.com/in/william-atemi" },
          ]}
        />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} Boafo Solutions. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">boafosolutions.com</p>
        </div>
      </div>
    </footer>
  );
}

type InternalLink = { label: string; to: "/" | "/services" | "/work" | "/company" | "/contact" };
type ExternalLink = { label: string; href: string };

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links?: InternalLink[];
  external?: ExternalLink[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links?.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
        {external?.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
