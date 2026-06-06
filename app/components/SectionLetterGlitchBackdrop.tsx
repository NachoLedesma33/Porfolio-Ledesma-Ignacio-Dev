"use client";

import type { ReactNode } from "react";
import LetterGlitch from "@/app/components/LetterGlitch";

/**
 * Fondo con LetterGlitch anclado al viewport de la sección (no al scroll del contenido).
 * Debe renderizarse dentro de un contenedor `relative h-full overflow-y-auto`.
 */
export default function SectionLetterGlitchBackdrop({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden rounded-[inherit] opacity-[0.72] dark:opacity-[0.58]">
        <LetterGlitch
          active={active}
          glitchSpeed={95}
          centerVignette
          outerVignette
          smooth
        />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[1] rounded-[inherit] bg-linear-to-b from-white/56 via-white/66 to-white/74 shadow-[inset_0_0_0_1px_rgba(255,228,230,0.45)] dark:from-stone-950/68 dark:via-stone-900/76 dark:to-stone-900/84 dark:shadow-[inset_0_0_0_1px_rgba(69,10,10,0.25)]"
        aria-hidden
      />
      <div className="section-content relative z-10 w-full">{children}</div>
    </>
  );
}
