"use client";

import { useRef, memo } from "react";
import SectionBackdrop from "@/app/components/SectionBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import SplitReveal from "@/app/components/SplitReveal";

const experiences = [
  {
    role: "Desarrollador Full Stack",
    company: "Grupo Nexos IT",
    period: "Ene 2023 — Presente",
    description:
      "Desarrollo y mantenimiento de sistemas de gestión interna para clientes del sector logístico y financiero. Lideré la migración de una plataforma monolítica a una arquitectura basada en microservicios con Node.js y React, reduciendo los tiempos de despliegue en un 40%. Implementé pipelines de CI/CD con GitHub Actions y Docker, y diseñé APIs RESTful con autenticación JWT para la integración con sistemas ERP de terceros. Trabajé directamente con stakeholders para definir requisitos técnicos y priorizar el backlog del equipo.",
    tech: ["React", "Node.js", "TypeScript", "Docker", "PostgreSQL", "GitHub Actions"],
  },
  {
    role: "Desarrollador Web",
    company: "Wiredot Labs (ex Stormbit)",
    period: "Mar 2021 — Dic 2022",
    description:
      "Me integré a un equipo reducido para construir un SaaS de automatización de reporting financiero. Desarrollé el frontend desde cero con Next.js y Tailwind CSS, y contribuí al backend con Python/FastAPI para el procesamiento de datos financieros en tiempo real. Diseñé e implementé un dashboard interactivo con Chart.js que permitía a los clientes visualizar métricas clave. Colaboré en la migración de la base de datos de MySQL a PostgreSQL y en la optimización de consultas que redujeron los tiempos de carga de reportes en un 60%. La empresa cambió de nombre y modelo de negocio durante mi etapa.",
    tech: ["Next.js", "Python", "FastAPI", "Tailwind CSS", "PostgreSQL", "Chart.js"],
  },
];

const Experience = memo(function Experience({ active = true }: { active?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-2 sm:p-3 lg:p-4 overflow-y-auto"
    >
      <SectionBackdrop active={active}>
      <header className="text-center pt-4 sm:pt-6 mb-10 sm:mb-12">
        <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-3">
          Experiencia
        </h2>
        <div className="accent-rule w-20 h-1 mx-auto rounded-full" />
      </header>

      <div className="w-full max-w-4xl mx-auto px-2 sm:px-3 lg:px-4 flex-1 flex flex-col gap-8 sm:gap-10">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-xl ring-1 ring-rose-100/60 dark:ring-rose-900/40 bg-gradient-to-br from-rose-50/90 to-red-50/60 dark:from-rose-950/35 dark:to-red-950/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  {exp.role}
                </h3>
                <p className="text-base text-rose-600 dark:text-rose-400 font-medium">
                  {exp.company}
                </p>
              </div>
              <span className="text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
                {exp.period}
              </span>
            </div>

            <SplitReveal
              text={exp.description}
              className="text-stone-900 dark:text-stone-200 leading-relaxed mb-4"
            />

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-rose-100/70 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </SectionBackdrop>
    </div>
  );
});

export default Experience;
