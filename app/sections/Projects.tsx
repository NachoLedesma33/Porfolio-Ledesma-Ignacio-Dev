"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const placeholderImage = "/game-2048/placeholder.png";
  // Close modal on Escape key and trigger animations
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      
      // Trigger animations after a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        const backdrop = document.querySelector('[data-modal-backdrop]');
        const content = document.querySelector('[data-modal-content]');
        
        if (backdrop) {
          (backdrop as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        }
        
        if (content) {
          content.classList.remove('scale-95', 'opacity-0');
          content.classList.add('scale-100', 'opacity-100');
        }
      }, 10);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        clearTimeout(timer);
      };
    }
  }, [selectedProject]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedProject(null);
    }
  };
  const projects = [
    {
      title: "Game 2048",
      description: "¡Bienvenido al clásico juego 2048 implementado con HTML, CSS y JavaScript puro! Este proyecto es una versión moderna y responsive del popular juego de rompecabezas numérico con interfaz limpia, sistema de puntuación, tema claro/oscuro y compatible con teclado y pantallas táctiles.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      status: "Completed",
      link: "https://nacholedesma33.github.io/Game-2048/",
      repo: "https://github.com/NachoLedesma33/Game-2048",
      images: ["/game-2048/1.png", "/game-2048/2.png", "/game-2048/3.png", "/game-2048/4.png"]
    },
    {
      title: "E-Commerce Platform",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      tech: ["Vue.js", "API", "Tailwind"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Social Media Analytics",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      tech: ["Python", "React", "Docker"],
      status: "Planning",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      tech: ["Next.js", "Framer", "SCSS"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis.",
      tech: ["React Native", "Node.js", "JWT"],
      status: "In Progress",
      link: "#"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Proyectos
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-purple-400 to-pink-600 mx-auto rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Project Header */}
              <div className="h-32 relative overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <Image 
                    src={placeholderImage} 
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  {project.images && project.images.length > 0 && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Ver Proyecto
                    </button>
                  )}
                  <a
                    href={project.link}
                    className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
                  >
                    Abrir Proyecto
                  </a>
                  
                  {/* Información resumida */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Tecnologías:</strong> {project.tech.join(', ')}</p>
                    <p><strong>Estado:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>{project.status}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail View */}
        {selectedProject && (
          <div 
            data-modal-backdrop
            className="fixed inset-0 bg-black bg-opacity-0 flex items-start justify-center z-50 p-4 pt-16 transition-all duration-300 ease-in-out"
            onClick={handleBackdropClick}
          >
            <div 
              data-modal-content
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto relative transform scale-95 opacity-0 transition-all duration-300 ease-out" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button positioned outside the content */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                
                {/* Images Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Galería del Proyecto</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {selectedProject.images.map((image: string, index: number) => (
                        <div key={index} className="shrink-0">
                          <Image 
                            src={image} 
                            alt={`${selectedProject.title} - Imagen ${index + 1}`}
                            width={400}
                            height={300}
                            className="rounded-lg shadow-lg"
                            priority={index < 2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Project Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedProject.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tecnologías</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Estado</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.link}
                      className="flex-1 bg-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors text-center"
                    >
                      Abrir Proyecto
                    </a>
                    {selectedProject.repo && (
                      <a
                        href={selectedProject.repo}
                        className="flex-1 bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors text-center"
                      >
                        Ver Código
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Animation trigger */}
        {selectedProject && (
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { 
                opacity: 0;
                transform: scale(0.9);
              }
              to { 
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        )}

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">
            Lorem Ipsum
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
}
