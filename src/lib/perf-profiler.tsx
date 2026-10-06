import { Profiler, type ProfilerOnRenderCallback, type ReactNode } from "react";

/**
 * Dev-only React Profiler wrapper.
 *
 * In production this is a passthrough (no overhead). In development it logs
 * every commit for `id` to the console with phase + actualDuration, so you can
 * verify (e.g.) that LiveOperationsSimulator tab cycling does NOT trigger
 * commits in Hero / Bento / FooterCTA.
 *
 * Open DevTools console and watch the table:
 *   [perf] LiveOps      update  12.3ms
 *   [perf] Hero         (silent — proves isolation)
 */
export function PerfBoundary({ id, children }: { id: string; children: ReactNode }) {
  if (!import.meta.env.DEV) return <>{children}</>;

  const onRender: ProfilerOnRenderCallback = (
    profilerId,
    phase,
    actualDuration,
    baseDuration,
  ) => {
    // eslint-disable-next-line no-console
    console.log(
      `[perf] ${profilerId.padEnd(18)} ${phase.padEnd(8)} ${actualDuration.toFixed(2)}ms (base ${baseDuration.toFixed(2)}ms)`,
    );
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
