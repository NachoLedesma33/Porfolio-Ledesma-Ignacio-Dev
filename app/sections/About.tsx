"use client";

import { useRef } from "react";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide w-full h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-1 sm:p-2 lg:p-3 min-h-screen overflow-y-auto"
    >
      <div className="w-full max-w-6xl mx-auto text-center px-1 sm:px-2 lg:px-3 flex-1 flex flex-col">
        {/* Profile Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Sobre Mi
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6 text-left flex-1">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8 sm:mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Años Exp</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Compromiso</div>
          </div>
        </div>
      </div>
    </div>
  );
}
