import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider, THEME_NO_FLASH_SCRIPT, useTheme } from "../lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Custom Business Portals & Automation Systems | Boafo Solutions" },
      { name: "description", content: "Custom software and web portal developers. Boafo Solutions delivers tailored business automation, M-Pesa integration, and property management systems for the modern enterprise." },
      { name: "author", content: "Boafo Solutions" },
      { name: "publisher", content: "Boafo Solutions" },
      { name: "theme-color", content: "#0b0f14" },
      { name: "language", content: "English" },
      { httpEquiv: "content-language", content: "en" },
      { property: "og:title", content: "Custom Business Portals & Automation Systems | Boafo Solutions" },
      { property: "og:description", content: "Custom web portals, M-Pesa integration, automated workflows, and green-energy software for modern enterprises." },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Boafo Solutions" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@boafosolutions" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.boafosolutions.com/#organization",
              name: "Boafo Solutions",
              alternateName: "Boafo",
              url: "https://www.boafosolutions.com",
              logo: {
                "@type": "ImageObject",
                "@id": "https://www.boafosolutions.com/#logo",
                url: "https://www.boafosolutions.com/boafo-logo-dark.svg",
                contentUrl: "https://www.boafosolutions.com/boafo-logo-dark.svg",
                caption: "Boafo Solutions",
              },
              image: { "@id": "https://www.boafosolutions.com/#logo" },
              description:
                "Custom software and web portal developers. Boafo Solutions builds business automation, M-Pesa integration, and property management software for the modern enterprise.",
              email: "info@boafosolutions.com",
              telephone: "+254737575156",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ngong 5th Avenue",
                addressLocality: "Upperhill",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
              areaServed: ["KE", "Africa", "Worldwide"],
              knowsAbout: [
                "Custom software development",
                "Web portal development",
                "M-Pesa integration",
                "Safaricom Daraja API",
                "Property management software",
                "SACCO software",
                "IoT telemetry",
                "Business automation",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "info@boafosolutions.com",
                  telephone: "+254737575156",
                  areaServed: ["KE", "Africa"],
                  availableLanguage: ["English", "Swahili"],
                },
              ],
              sameAs: [
                "https://www.facebook.com/p/BOAFO-Solutions-No-CRB-Loans-61588373023479/",
                "https://ke.linkedin.com/in/william-atemi",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.boafosolutions.com/#website",
              url: "https://www.boafosolutions.com",
              name: "Boafo Solutions",
              description:
                "Custom software, M-Pesa integration, and business automation for the modern enterprise.",
              publisher: { "@id": "https://www.boafosolutions.com/#organization" },
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.boafosolutions.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Prevent theme flash — runs before paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_NO_FLASH_SCRIPT }} />
        {/* Google tag (gtag.js) — present on every page */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-51JEWV0C1Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-51JEWV0C1Z');
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="top-center" richColors />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <ThemedToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
