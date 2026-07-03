"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-cube";
import type { NavigationItem } from "./Sidebar";

import Hero from "../sections/Hero";

const About = dynamic(() => import("../sections/About"), { ssr: false });
const Experience = dynamic(() => import("../sections/Experience"), { ssr: false });
const Projects = dynamic(() => import("../sections/Projects"), { ssr: false });
const Skills = dynamic(() => import("../sections/Skills"), { ssr: false });
const Certificates = dynamic(() => import("../sections/Certificates"), { ssr: false });
const Contact = dynamic(() => import("../sections/Contact"), { ssr: false });

interface SwiperContainerProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onNavigate: (id: NavigationItem) => void;
}

export default function SwiperContainer({ currentSlide, onSlideChange, onNavigate }: SwiperContainerProps) {
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper && swiper.activeIndex !== currentSlide) {
      swiper.slideTo(currentSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let pendingDir: 'next' | 'prev' | null = null;
    let pendingTimer: ReturnType<typeof setTimeout> | null = null;
    let cachedScrollEl: HTMLElement | null = null;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;

    const onWheel = (e: WheelEvent) => {
      const swiper = swiperRef.current?.swiper;
      if (!swiper || swiper.animating) return;

      const scrollEl = swiper.slides[swiper.activeIndex]?.querySelector<HTMLElement>('.scrollbar-hide');
      if (!scrollEl) return;

      if (scrollEl !== cachedScrollEl) {
        cachedScrollEl = scrollEl;
        cachedScrollHeight = scrollEl.scrollHeight;
        cachedClientHeight = scrollEl.clientHeight;
      }

      const scrollTop = scrollEl.scrollTop;
      const atTop = scrollTop <= 2;
      const atBottom = cachedScrollHeight - scrollTop - cachedClientHeight <= 2;
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

  const syncSectionBackdrops = () => {
    window.dispatchEvent(new CustomEvent("section-backdrop-sync"));
  };

  const handleSlideChange = (swiper: SwiperType) => {
    onSlideChange(swiper.activeIndex);
    syncSectionBackdrops();
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
        onInit={syncSectionBackdrops}
        onResize={syncSectionBackdrops}
        className="w-full h-dvh px-0.5 sm:px-2 lg:px-3"
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Hero active={currentSlide === 0} onNavigate={onNavigate} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <About active={currentSlide === 1} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Experience active={currentSlide === 2} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Projects active={currentSlide === 3} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Skills active={currentSlide === 4} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Certificates active={currentSlide === 5} />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-1 sm:p-2 lg:p-3">
            <Contact active={currentSlide === 6} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
