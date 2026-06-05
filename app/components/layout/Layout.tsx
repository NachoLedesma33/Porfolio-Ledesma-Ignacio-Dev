"use client";

import { useState } from "react";
import Sidebar from "./../Sidebar";
import SwiperContainer from "./../SwiperContainer";
import type { NavigationItem } from "./../Sidebar";

const NAV_ORDER: NavigationItem[] = ["inicio", "about", "projects", "skills", "certificates", "contact"];

const slideMapping: Record<NavigationItem, number> = {
  inicio: 0,
  about: 1,
  projects: 2,
  skills: 3,
  certificates: 4,
  contact: 5,
};

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeItem = NAV_ORDER[currentSlide];

  const handleNavigate = (id: NavigationItem) => {
    setCurrentSlide(slideMapping[id]);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex h-screen bg-rose-50/60 dark:bg-neutral-950 overflow-hidden">
      {/* Sidebar - Desktop: Fixed, Mobile: Drawer */}
      <div className={`
        fixed lg:relative lg:block z-[60] h-full transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/10 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isSidebarOpen}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-stone-900 rounded-lg shadow-md ring-1 ring-rose-200/80 dark:ring-rose-900/50 text-stone-800 dark:text-rose-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Swiper Container */}
        <SwiperContainer 
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
