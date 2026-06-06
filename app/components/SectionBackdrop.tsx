"use client";

import type { ReactNode } from "react";
import SectionLetterGlitchBackdrop from "@/app/components/SectionLetterGlitchBackdrop";
// import SectionVenomBackdrop from "@/app/components/SectionVenomBackdrop";

/** Cambiar el import activo para alternar entre fondos de sección. */
export default function SectionBackdrop({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <SectionLetterGlitchBackdrop active={active}>
      {children}
    </SectionLetterGlitchBackdrop>
  );
}
