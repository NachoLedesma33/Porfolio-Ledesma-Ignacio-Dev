"use client";

import { useRef } from "react";
import SectionBackdrop from "@/app/components/SectionBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import Image from "next/image";
import SplitReveal from "@/app/components/SplitReveal";
import { getProjectCount } from "@/app/lib/projects";

const projectCount = getProjectCount();

export default function About({ active = true }: { active?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col items-center rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-1 sm:p-2 lg:p-3 overflow-y-auto"
    >
      <SectionBackdrop active={active}>
      <div className="about-section w-full max-w-6xl mx-auto text-center px-1 sm:px-2 lg:px-3 flex-1 flex flex-col">
        {/* Profile Section */}
        <div className="pt-4 sm:pt-6 lg:pt-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full shadow-lg shadow-rose-500/25 overflow-hidden ring-4 ring-rose-100 dark:ring-rose-900/40">
            <Image
              src="/portfolio_placeholder.webp"
              alt="Foto de perfil"
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="section-heading text-4xl font-display tracking-tight mb-2">
            Sobre Mi
          </h1>
          <div className="accent-rule w-24 h-1 mx-auto rounded-full" aria-hidden />
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6 text-left flex-1">
          <SplitReveal
            text="Soy desarrollador full stack con enfoque en la creación de aplicaciones prácticas, claras y bien estructuradas. Me interesa construir soluciones que no solo funcionen, sino que también sean fáciles de mantener y escalar. Trabajo tanto en frontend como en backend, priorizando una buena experiencia de usuario, rendimiento y lógica sólida detrás de cada proyecto."
            className="text-lg text-stone-950 dark:text-stone-200 leading-relaxed"
          />
          
          <SplitReveal
            text="Tengo una orientación marcada hacia proyectos aplicables a entornos reales, como herramientas de gestión, visualización de datos y aplicaciones web funcionales. Me enfoco en resolver problemas de manera eficiente, iterar rápido y mantener un equilibrio entre simplicidad y funcionalidad. Siempre estoy explorando nuevas tecnologías y mejores prácticas para mejorar la calidad de lo que construyo."
            className="text-lg text-stone-950 dark:text-stone-200 leading-relaxed"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8 sm:mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">5+</div>
            <div className="text-sm text-stone-900 dark:text-stone-400 font-medium">Años Exp</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-700 dark:text-red-400 tabular-nums">{projectCount}+</div>
            <div className="text-sm text-stone-900 dark:text-stone-400 font-medium">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-500 dark:text-rose-300 tabular-nums">100%</div>
            <div className="text-sm text-stone-900 dark:text-stone-400 font-medium">Compromiso</div>
          </div>
        </div>
      </div>
      </SectionBackdrop>
    </div>
  );
}
