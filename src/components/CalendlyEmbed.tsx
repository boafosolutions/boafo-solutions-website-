import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  url: string;
  minHeight?: number;
}

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

export function CalendlyEmbed({ url, minHeight = 720 }: CalendlyEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    function init() {
      if (ref.current && window.Calendly) {
        ref.current.innerHTML = "";
        window.Calendly.initInlineWidget({ url, parentElement: ref.current });
        setReady(true);
      }
    }

    if (window.Calendly) {
      init();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [url]);

  return (
    <div className="relative">
      {!ready && (
        <div
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
          style={{ minHeight }}
        >
          Loading calendar…
        </div>
      )}
      <div
        ref={ref}
        className="calendly-inline-widget rounded-2xl overflow-hidden border border-border bg-background"
        style={{ minWidth: 320, height: minHeight }}
        data-auto-load="false"
      />
    </div>
  );
}
