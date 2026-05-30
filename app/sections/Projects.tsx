"use client";

import { useState, useEffect, useRef } from "react";
import SectionVenomBackdrop from "@/app/components/SectionVenomBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import Image from "next/image";
import AnimatedBorder from "@/app/components/AnimatedBorder";
import SplitReveal from "@/app/components/SplitReveal";

type ProjectCategory = "Proyectos" | "Juegos (Extra)";

type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  link: string;
  repo?: string;
  images?: string[];
};

const projectsByCategory: Record<ProjectCategory, Project[]> = {
  "Proyectos": [
    {
      title: "CodeReflex",
      description: "Plataforma interactiva de entrenamiento técnico para desarrolladores. Combina el speed typing de código real (Reflex Typing) con la resolución guiada de problemas de algoritmos (Guided Problems). Cuenta con editor Monaco integrado, sistema de gamificación con logros (XP), heatmaps de actividad y soporte multi-lenguaje.",
      tech: ["Next.js 16", "TypeScript", "Monaco Editor", "Zustand", "Tailwind CSS v4", "Zod"],
      status: "In Progress",
      link: "https://code-reflex-lac.vercel.app/",
      repo: "https://github.com/NachoLedesma33/CodeReflex",
      images: [
        "/code-reflex/1placeholdercodereflex.webp",
        "/code-reflex/2codeflex.webp",
        "/code-reflex/3codereflex.webp",
        "/code-reflex/4codereflex.webp",
        "/code-reflex/5codereflex.webp"
      ],
    },
    {
      title: "MatchFlow",
      description: "Sistema de emparejamiento en tiempo real con algoritmos híbridos para gaming competitivo. Encuentra teammates perfectos para tus juegos favoritos al instante. Soporta 12 juegos populares incluyendo Valorant, League of Legends, CS2, Dota 2 y más.",
      tech: ["Node.js", "TypeScript", "Express", "Socket.io", "React", "Vite", "Tailwind CSS"],
      status: "In Progress",
      link: "https://matchflow-one.vercel.app/",
      repo: "https://github.com/NachoLedesma33/matchflow",
      images: ["/matflow/1mateflowplaceholder.webp", "/matflow/2matflow.webp", "/matflow/3matflow.webp", "/matflow/4matflow.webp", "/matflow/5matflow.webp"],
    },
    {
      title: "Simulador de Carrera IT",
      description: "Simulador interactivo y no lineal de carrera en tecnología. Toma decisiones, desarrolla habilidades, gestiona el estrés y alcanza la cima: de Trainee a CTO. Desarrollado con Flask y Python, incluye motor de decisiones, eventos aleatorios y sistema de logros.",
      tech: ["Python", "Flask", "JavaScript", "HTML5", "CSS3"],
      status: "Completed",
      link: "https://nacholedesma.pythonanywhere.com/",
      repo: "https://github.com/NachoLedesma33/Simulador-de-Carrera-IT",
      images: [
        "/carrera-IT/1ITplaceholder.webp",
        "/carrera-IT/2IT.webp",
        "/carrera-IT/3IT.webp",
        "/carrera-IT/4IT.webp",
        "/carrera-IT/5IT.webp",
        "/carrera-IT/6IT.webp"
      ],
    },
    {
      title: "Ejercicios de Python",
      description: "Aplicación web interactiva para practicar programación en Python con un editor de código profesional directamente en el navegador. Incluye una amplia variedad de ejercicios interactivos sobre matemáticas, métodos numéricos y ciencia de datos. Utiliza WebAssembly (Pyodide) para ejecutar el código localmente de forma segura y sin necesidad de un servidor backend.",
      tech: ["Next.js", "React", "TypeScript", "Pyodide", "Monaco Editor", "Tailwind CSS"],
      status: "Completed",
      link: "https://python-excercises.vercel.app/",
      repo: "https://github.com/NachoLedesma33/python-excercises",
      images: [
        "/python-excercises/1pythonexcercisesplaceholder.webp",
        "/python-excercises/2pythonexcercises.webp",
        "/python-excercises/3pythonexercises.webp",
        "/python-excercises/4pythonexercises.webp",
        "/python-excercises/5pythonexcersices.webp",
        "/python-excercises/Screenshot 2026-05-23 185928.webp"
      ],
    },
    {
      title: "API Client - Mini Postman",
      description: "Cliente API ligero e interactivo construido con Astro y React. Inspirado en Postman, permite enviar solicitudes HTTP, gestionar colecciones, trabajar con variables de entorno, importar/exportar cURL y soportar OpenAPI 3.0. Con arquitectura Astro Islands para rendimiento óptimo.",
      tech: ["Astro", "React", "TypeScript", "TailwindCSS", "Zustand", "Dexie", "IndexedDB"],
      status: "Completed",
      link: "https://client-api-interactive.vercel.app/",
      repo: "https://github.com/NachoLedesma33/client-api-interactive",
      images: ["/api-client/1placeholder-api-client-v2.webp", "/api-client/2api-client.webp", "/api-client/3api-client.webp", "/api-client/4api-client.webp", "/api-client/5api-client.webp"],
    },
    {
      title: "CraftUI",
      description: "Librería de componentes UI modernos, accesibles y altamente personalizables. Diseñada para acelerar el desarrollo frontend con componentes listos para usar, animaciones fluidas, soporte para modo oscuro y una estética premium. Proyecto en proceso de desarrollo.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "In Progress",
      link: "https://craft-ui-omega.vercel.app/",
      repo: "https://github.com/NachoLedesma33/CraftUI",
      images: ["/craftUI/1craftUIPlaceholder.webp"],
    },
    {
      title: "Dashboard de Productividad",
      description: "Dashboard interactivo para el seguimiento y análisis de productividad personal. Implementa métricas en tiempo real, gráficos dinámicos y sistema de gestión de tareas con interfaz moderna y responsive diseñada para optimizar el rendimiento diario.",
      tech: ["TypeScript", "CSS3", "TailwindCSS", "HTML", "React", "Vite"],
      status: "Completed",
      link: "https://dashboard-productividad-ledesma.vercel.app/",
      repo: "https://github.com/NachoLedesma33/dashboard-productividad",
      images: ["/dashboard-productividad/placeholder-productividad.webp", "/dashboard-productividad/uno-productividad.webp", "/dashboard-productividad/dos-productividad.webp", "/dashboard-productividad/tres-productividad.webp"],
    },
    {
      title: "Simulador Visual de Algoritmos",
      description: "Herramienta educativa interactiva para visualizar y entender el funcionamiento de algoritmos de ordenamiento y búsqueda. Permite observar paso a paso cómo operan diferentes algoritmos con controles de velocidad y animaciones fluidas.",
      tech: ["TypeScript", "CSS3", "TailwindCSS", "HTML", "React", "Vite"],
      status: "Completed",
      link: "https://simulador-visual-de-algoritmos-lede.vercel.app/",
      repo: "https://github.com/NachoLedesma33/Simulador-Visual-de-Algoritmos",
      images: ["/visualizador-algoritmos/placeholderalgoritmo.webp", "/visualizador-algoritmos/uno-algoritmo.webp", "/visualizador-algoritmos/dos-algoritmo.webp", "/visualizador-algoritmos/tres-algoritmo.webp", "/visualizador-algoritmos/cuatro-algoritmo.webp", "/visualizador-algoritmos/cinco-algoritmo.webp"],
    },
    {
      title: "Budget App",
      description: "Aplicación web para gestión de presupuestos personales desarrollada con HTML5, CSS3 y JavaScript puro. Interfaz moderna y responsive con gráficos interactivos, categorización de gastos y análisis financiero en tiempo real.",
      tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      status: "Completed",
      link: "https://nacholedesma33.github.io/budgetApp/",
      repo: "https://github.com/NachoLedesma33/budgetApp",
      images: ["/budget-app/PlaceholderBudget.webp", "/budget-app/2budget.webp", "/budget-app/3budget.webp"],
    }
  ],
  "Juegos (Extra)": [
    {
      title: "Game 2048",
      description: "¡Bienvenido al clásico juego 2048 implementado con HTML, CSS y JavaScript puro! Este proyecto es una versión moderna y responsive del popular juego de rompecabezas numérico con interfaz limpia, sistema de puntuación, tema claro/oscuro y compatible con teclado y pantallas táctiles.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      status: "Completed",
      link: "https://nacholedesma33.github.io/Game-2048/",
      repo: "https://github.com/NachoLedesma33/Game-2048",
      images: ["/game-2048/placeholder.webp", "/game-2048/2.webp", "/game-2048/3.webp", "/game-2048/4.webp"],
    },
    {
      title: "Snake Game",
      description: "¡Clásico juego de la serpiente implementado con HTML5, CSS3 y JavaScript puro! Este proyecto recrea el icónico juego arcade con movimiento fluido, sistema de puntuación, niveles progresivos, controles de teclado responsive y diseño moderno adaptable a diferentes dispositivos.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      status: "Completed",
      link: "https://nacholedesma33.github.io/Snake-Game/",
      repo: "https://github.com/NachoLedesma33/Snake-Game",
      images: ["/game-snake/1placeholder.webp", "/game-snake/2snake.webp", "/game-snake/3snake.webp"],
    }
  ]
};

const categories: ProjectCategory[] = ["Proyectos", "Juegos (Extra)"];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);
  useMouseDragScroll(modalScrollRef, !!selectedProject);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
      const timer = setTimeout(() => {
        const backdrop = document.querySelector("[data-modal-backdrop]");
        const content = document.querySelector("[data-modal-content]");
        if (backdrop) (backdrop as HTMLElement).style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        if (content) {
          content.classList.remove("scale-95", "opacity-0");
          content.classList.add("scale-100", "opacity-100");
        }
      }, 10);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        clearTimeout(timer);
      };
    }
  }, [selectedProject]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedProject(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planning": return "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div ref={scrollRef} className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-1 sm:p-2 lg:p-3 overflow-y-auto min-h-screen">
      <SectionVenomBackdrop>
        <div className="text-center mb-8">
          <h1 className="section-heading text-4xl font-bold tracking-tight mb-2">Proyectos</h1>
          <div className="accent-rule w-24 h-1 mx-auto rounded-full" aria-hidden />
        </div>

        <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 flex-1 flex flex-col space-y-12">
          {categories.map((category) => {
            const categoryProjects = projectsByCategory[category];
            if (categoryProjects.length === 0) return null;
            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50">{category}</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-rose-300 to-transparent dark:from-rose-700" />
                  <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
                    {categoryProjects.length} {categoryProjects.length === 1 ? "proyecto" : "proyectos"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {categoryProjects.map((project, index) => (
                    <AnimatedBorder key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" innerClass="bg-white dark:bg-stone-900">
                      <div className="h-40 relative overflow-hidden rounded-t-xl">
                        {project.images && project.images.length > 0 ? (
                          <Image src={project.images[0]} alt={project.title} width={800} height={320} className="w-full h-full object-cover bg-stone-100 dark:bg-stone-800 rounded-t-xl" priority={index === 0} />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-rose-500 to-red-700 flex items-center justify-center">
                            <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>{project.status}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-3">{project.title}</h3>
                        <SplitReveal text={project.description} className="text-stone-600 dark:text-stone-300 mb-6 line-clamp-3 text-base leading-relaxed" />
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 text-sm font-medium bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100 rounded-full hover:bg-rose-200/90 dark:hover:bg-rose-900 transition-colors">{tech}</span>
                          ))}
                        </div>
                        <div className="flex flex-col space-y-3">
                          {project.images && project.images.length > 0 && (
                            <button onClick={() => setSelectedProject(project)} className="w-full bg-linear-to-r from-rose-600 to-red-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-rose-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-600/20 hover:shadow-xl cursor-pointer">Ver Proyecto</button>
                          )}
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full bg-rose-700 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-800 transition-colors text-center">Abrir Proyecto</a>
                          <div className="text-sm text-stone-600 dark:text-stone-300 space-y-1">
                            <p><strong>Tecnologías:</strong> {project.tech.join(", ")}</p>
                            <p><strong>Estado:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>{project.status}</span></p>
                          </div>
                        </div>
                      </div>
                    </AnimatedBorder>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {selectedProject && (
          <div data-modal-backdrop className="fixed inset-0 bg-black bg-opacity-0 flex items-start justify-center z-50 p-4 pt-16 transition-all duration-300 ease-in-out" onClick={handleBackdropClick}>
            <div ref={modalScrollRef} data-modal-content className="scrollbar-hide bg-white dark:bg-stone-900 rounded-lg max-w-6xl w-full max-h-[85vh] overflow-y-auto relative transform scale-95 opacity-0 transition-all duration-300 ease-out ring-1 ring-rose-100 dark:ring-rose-950/50" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-lg" aria-label="Close modal">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative h-72 sm:h-96 w-full">
                  <Image src={selectedProject.images[0]} alt={selectedProject.title} fill className="object-cover rounded-t-lg" priority />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-50">{selectedProject.title}</h2>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span>
                </div>
                <SplitReveal text={selectedProject.description} className="text-lg text-stone-700 dark:text-stone-200 mb-8" />
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-4">Galería del Proyecto</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4" data-no-vertical-drag-scroll>
                    {selectedProject.images?.map((image, index) => (
                      <div key={index} className="shrink-0">
                        <Image src={image} alt={`${selectedProject.title} - Imagen ${index + 1}`} width={400} height={300} className="w-96 h-72 object-cover rounded-lg shadow-lg" priority={index < 2} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-2">Descripción</h3>
                    <SplitReveal text={selectedProject.description} className="text-stone-700 dark:text-stone-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-2">Tecnologías</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span key={index} className="px-3 py-1 text-sm font-medium bg-rose-100/90 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-rose-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-800 transition-colors text-center">Abrir Proyecto</a>
                    {selectedProject.repo && (
                      <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="flex-1 bg-stone-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-stone-800 transition-colors text-center">Ver Código</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedProject && (
          <style jsx>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          `}</style>
        )}

        <div className="mt-8 p-6 bg-rose-50 dark:bg-rose-950/30 rounded-lg ring-1 ring-rose-100/70 dark:ring-rose-900/40">
          <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-200 mb-3">Lorem Ipsum</h3>
          <p className="text-stone-700 dark:text-stone-200 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>
      </SectionVenomBackdrop>
    </div>
  );
}