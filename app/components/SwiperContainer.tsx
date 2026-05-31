"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { NavigationItem } from "./Sidebar";

import "swiper/css";
import "swiper/css/effect-cube";

const About = dynamic(() => import("../sections/About"));
const Projects = dynamic(() => import("../sections/Projects"));
const Skills = dynamic(() => import("../sections/Skills"));
const Certificates = dynamic(() => import("../sections/Certificates"));
const Contact = dynamic(() => import("../sections/Contact"));

const slideMapping: Record<NavigationItem, number> = {
  about: 0,
  projects: 1,
  skills: 2,
  certificates: 3,
  contact: 4,
};

export default function SwiperContainer() {
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const { slideId } = event.detail;
      const targetSlide = slideMapping[slideId as NavigationItem];
      
      if (swiperRef.current && targetSlide !== undefined) {
        swiperRef.current.swiper.slideTo(targetSlide);
        setCurrentSlide(targetSlide);
      }
    };

    window.addEventListener('navigateToSlide', handleNavigate as EventListener);
    return () => window.removeEventListener('navigateToSlide', handleNavigate as EventListener);
  }, [currentSlide]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let pendingDir: 'next' | 'prev' | null = null;
    let pendingTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      const swiper = swiperRef.current?.swiper;
      if (!swiper || swiper.animating) return;

      const scrollEl = swiper.slides[swiper.activeIndex]?.querySelector<HTMLElement>('.scrollbar-hide');
      if (!scrollEl) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const atTop = scrollTop <= 2;
      const atBottom = scrollHeight - scrollTop - clientHeight <= 2;
      const goingDown = e.deltaY > 0;

      const canGoNext = goingDown && atBottom && !swiper.isEnd;
      const canGoPrev = !goingDown && atTop && !swiper.isBeginning;

      if (canGoNext || canGoPrev) {
        e.preventDefault();
        const dir = goingDown ? 'next' : 'prev';

        if (pendingDir === dir) {
          if (dir === 'next') swiper.slideNext();
          else swiper.slidePrev();
          pendingDir = null;
          if (pendingTimer) clearTimeout(pendingTimer);
          pendingTimer = null;
        } else {
          pendingDir = dir;
          if (pendingTimer) clearTimeout(pendingTimer);
          pendingTimer = setTimeout(() => { pendingDir = null; }, 500);
        }
      } else {
        pendingDir = null;
        if (pendingTimer) clearTimeout(pendingTimer);
        pendingTimer = null;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-linear-to-br from-rose-50/90 via-stone-50 to-rose-100/50 dark:from-stone-950 dark:via-neutral-950 dark:to-rose-950/20">
      <Swiper
        ref={swiperRef}
        effect="cube"
        speed={700}
        grabCursor={false}
        noSwiping={true}
        noSwipingSelector="p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, code, th, td, label, legend, figcaption, summary, dt, dd, .split-word, .text-balance, .section-heading, .accent-rule span"
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        modules={[EffectCube]}
        onSlideChange={handleSlideChange}
        className="w-full h-screen max-h-[600px] px-0.5 sm:px-2 lg:px-3"
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <About active={currentSlide === 0} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Projects active={currentSlide === 1} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Skills active={currentSlide === 2} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Certificates active={currentSlide === 3} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Contact active={currentSlide === 4} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
