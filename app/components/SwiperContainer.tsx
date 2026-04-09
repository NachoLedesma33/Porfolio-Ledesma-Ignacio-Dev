"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { NavigationItem } from "./Sidebar";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slideMapping: Record<NavigationItem, number> = {
  about: 0,
  skills: 1,
  projects: 2,
  contact: 3,
};

export default function SwiperContainer() {
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const { slideId } = event.detail;
      const targetSlide = slideMapping[slideId as NavigationItem];
      
      if (swiperRef.current && targetSlide !== undefined) {
        // Always navigate to the left (next slide direction)
        if (targetSlide > currentSlide) {
          swiperRef.current.swiper.slideNext();
        } else if (targetSlide < currentSlide) {
          // Wrap around to the end if going backwards
          swiperRef.current.swiper.slideTo(slideMapping.contact);
          setTimeout(() => {
            for (let i = 0; i < slideMapping.contact; i++) {
              setTimeout(() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideNext();
                }
              }, i * 100);
            }
          }, 100);
        }
        setCurrentSlide(targetSlide);
      }
    };

    window.addEventListener('navigateToSlide', handleNavigate as EventListener);
    return () => window.removeEventListener('navigateToSlide', handleNavigate as EventListener);
  }, [currentSlide]);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <Swiper
        ref={swiperRef}
        effect="cube"
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        navigation={false}
        pagination={false}
        modules={[EffectCube, Navigation, Pagination]}
        onSlideChange={handleSlideChange}
        className="w-full max-w-4xl h-full max-h-[600px]"
        style={{
          "--swiper-navigation-size": "30px",
        } as React.CSSProperties}
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-8">
            <About />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-8">
            <Skills />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-8">
            <Projects />
          </div>
        </SwiperSlide>
        
        <SwiperSlide className="flex items-center justify-center">
          <div className="w-full h-full p-8">
            <Contact />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
