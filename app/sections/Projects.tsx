"use client";

import { useState, useEffect, useRef } from "react";
import SectionVenomBackdrop from "@/app/components/SectionVenomBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import Image from "next/image";
import AnimatedBorder from "@/app/components/AnimatedBorder";
import SplitReveal from "@/app/components/SplitReveal";
import { Project, projectsByCategory, projectCategories } from "@/app/lib/projects";

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
          {projectCategories.map((category) => {
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