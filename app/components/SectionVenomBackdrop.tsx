"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const VenomBeam = dynamic(() => import("@/app/components/ui/venom-beam"), { ssr: false });
const MorphingBlobs = dynamic(() => import("@/app/components/MorphingBlobs"), { ssr: false });

/**
 * Fondo tipo [Venom Beam](https://scrollxui.dev/docs/components/venom-beam) con velo
 * para mantener contraste y lectura del contenido.
 */
export default function SectionVenomBackdrop({ children, active = true }: { children: ReactNode; active?: boolean }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden rounded-[inherit]">
        <VenomBeam fill embed active={active} />
      </div>
      <MorphingBlobs active={active} />
      <div
        className="pointer-events-none fixed inset-0 z-[1] rounded-[inherit] bg-linear-to-b from-white/80 via-white/88 to-white/93 shadow-[inset_0_0_0_1px_rgba(255,228,230,0.45)] dark:from-stone-950/78 dark:via-stone-900/88 dark:to-stone-900/94 dark:shadow-[inset_0_0_0_1px_rgba(69,10,10,0.25)]"
        aria-hidden
      />
      <div className="section-content relative z-10 w-full">{children}</div>
    </>
  );
}
