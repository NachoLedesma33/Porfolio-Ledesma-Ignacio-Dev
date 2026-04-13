"use client";

import { useState } from "react";

export interface SidebarProps {
  onClose: () => void;
}

export type NavigationItem = "about" | "skills" | "projects" | "contact" | "certificates";

const navigationItems: { id: NavigationItem; label: string; icon: string }[] = [
  { id: "about", label: "Sobre Mi", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "skills", label: "Habilidades", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { id: "projects", label: "Proyectos", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { id: "certificates", label: "Certificados", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "contact", label: "Contacto", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<NavigationItem>("about");

  const handleNavigation = (itemId: NavigationItem) => {
    setActiveItem(itemId);
    
    // Emit custom event for Swiper navigation
    const event = new CustomEvent('navigateToSlide', { detail: { slideId: itemId } });
    window.dispatchEvent(event);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-stone-950 border-r border-red-100/80 dark:border-red-950/60 flex flex-col items-center">
      {/* Header */}
      <div className="p-6 border-b border-red-100/80 dark:border-red-950/60">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-red-100">
          Portfolio <br/> Ledesma Ignacio, Manuel Dev
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 w-full items-center justify-center">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${activeItem === item.id
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-l-4 border-rose-600 dark:border-rose-400'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-rose-50/70 dark:hover:bg-stone-900'
                  }
                `}
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
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-rose-100/80 dark:border-rose-950/60">
        <div className="text-xs text-stone-500 dark:text-rose-200/60">
          © 2024 Portfolio
        </div>
      </div>
    </div>
  );
}
