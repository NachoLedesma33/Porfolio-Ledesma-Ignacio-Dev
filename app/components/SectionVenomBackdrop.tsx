"use client";

import type { ReactNode } from "react";
import VenomBeam from "@/app/components/ui/venom-beam";

/**
 * Fondo tipo [Venom Beam](https://scrollxui.dev/docs/components/venom-beam) con velo
 * para mantener contraste y lectura del contenido.
 */
export default function SectionVenomBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate w-full min-h-full shrink-0 rounded-[inherit]">
      <div className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden rounded-[inherit]">
        <VenomBeam fill embed />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] min-h-full rounded-[inherit] bg-linear-to-b from-white/80 via-white/88 to-white/93 shadow-[inset_0_0_0_1px_rgba(255,228,230,0.45)] dark:from-stone-950/78 dark:via-stone-900/88 dark:to-stone-900/94 dark:shadow-[inset_0_0_0_1px_rgba(69,10,10,0.25)]"
        aria-hidden
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
