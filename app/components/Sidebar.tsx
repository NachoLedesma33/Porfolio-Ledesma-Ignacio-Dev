"use client";

import { AnimatedThemeToggler } from "../../components/ui/animated-theme-toggler";

export interface SidebarProps {
  onClose: () => void;
  activeItem: NavigationItem;
  onNavigate: (id: NavigationItem) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export type NavigationItem = "inicio" | "about" | "experience" | "skills" | "projects" | "contact" | "certificates";

const navigationItems: { id: NavigationItem; label: string; icon: string }[] = [
  { id: "inicio", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "about", label: "Sobre Mi", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "experience", label: "Experiencia", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "projects", label: "Proyectos", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { id: "skills", label: "Habilidades", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { id: "certificates", label: "Certificados", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "contact", label: "Contacto", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function Sidebar({ 
  onClose, 
  activeItem, 
  onNavigate,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const handleNavigation = (itemId: NavigationItem) => {
    onNavigate(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className={`
      ${isCollapsed ? 'w-52 lg:w-16' : 'w-52 lg:w-52'}
      max-w-[80vw] h-full bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-r border-red-100/80 dark:border-red-950/60 flex flex-col items-center shadow-xl overflow-y-auto scrollbar-hide transition-all duration-300 ease-in-out
    `}>
      {/* Header */}
      <div className="p-5 border-b border-red-100/80 dark:border-red-950/60 w-full flex flex-col items-center justify-center relative h-[81px] shrink-0 overflow-hidden">
        <div className={`transition-all duration-300 flex items-center justify-center ${isCollapsed ? 'opacity-100 scale-100 animate-pulse-slow' : 'opacity-0 scale-50 absolute pointer-events-none'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            P
          </div>
        </div>
        <div className={`transition-all duration-300 w-full ${isCollapsed ? 'opacity-0 scale-95 absolute pointer-events-none' : 'opacity-100 scale-100'}`}>
          <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-red-100 leading-tight">
            Portfolio <br/> Ledesma Ignacio, Manuel Dev
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 w-full flex flex-col">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center rounded-lg transition-all duration-200 py-4
                  ${isCollapsed ? 'justify-start lg:justify-center lg:px-0 px-3 space-x-3 lg:space-x-0' : 'justify-start px-3 space-x-3'}
                  ${activeItem === item.id
                    ? 'bg-rose-50 dark:bg-red-950/40 text-rose-700 dark:text-red-300 border-l-4 border-red-600 dark:border-red-400'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-rose-50/70 dark:hover:bg-stone-900'
                  }
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <svg 
                  className="w-5 h-5 shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={item.icon}
                  />
                </svg>
                <span className={`font-medium transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-100 lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4 py-14 w-full mt-auto">
          <AnimatedThemeToggler
            variant="circle"
            className="px-3 py-1 rounded-xl text-stone-600 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-stone-900 transition-colors"
          />
          
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              } else {
                onToggleCollapse?.();
              }
            }}
            className="flex items-center justify-center p-2 rounded-xl text-stone-600 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-stone-900 transition-colors cursor-pointer"
            title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isCollapsed ? (
              // Icono PanelLeftOpen (Open / Expandir)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 3v18" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="m13 15 3-3-3-3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              // Icono PanelLeftClose (Close / Colapsar)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 3v18" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="m16 15-3-3 3-3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-rose-100/80 dark:border-rose-950/60 w-full flex items-center justify-center overflow-hidden h-[45px] shrink-0">
        <div className={`text-xs text-stone-500 dark:text-rose-200/60 whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-95 lg:opacity-0 absolute pointer-events-none' : 'opacity-100 scale-100'}`}>
          © {new Date().getFullYear()} Portfolio
        </div>
        <div className={`text-xs text-stone-500 dark:text-rose-200/60 transition-all duration-300 ${isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
          ©
        </div>
      </div>
    </div>
  );
}
