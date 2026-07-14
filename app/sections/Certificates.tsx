"use client";

import { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import SectionBackdrop from "@/app/components/SectionBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";
import AnimatedBorder from "@/app/components/AnimatedBorder";
import { Certificate, certificates } from "@/app/lib/certificates";

const Certificates = memo(function Certificates({ active = true }: { active?: boolean }) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useMouseDragScroll(scrollRef);
  useMouseDragScroll(modalScrollRef, !!selectedCertificate);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedCertificate) {
      dialog.showModal();
      requestAnimationFrame(() => {
        const content = dialog.querySelector("[data-certificate-modal-content]");
        if (content) {
          content.classList.remove("scale-95", "opacity-0");
          content.classList.add("scale-100", "opacity-100");
        }
      });
    } else {
      const content = dialog.querySelector("[data-certificate-modal-content]");
      if (content) {
        content.classList.remove("scale-100", "opacity-100");
        content.classList.add("scale-95", "opacity-0");
        setTimeout(() => dialog.close(), 300);
      } else {
        dialog.close();
      }
    }
  }, [selectedCertificate]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedCertificate(null);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-1 sm:p-2 lg:p-3 overflow-y-auto min-h-screen"
    >
      <SectionBackdrop active={active}>
        <div className="text-center pt-4 sm:pt-6 mb-8">
          <h2 className="section-heading text-4xl font-display tracking-tight mb-2">
            Certificados
          </h2>
          <div className="accent-rule w-24 h-1 mx-auto rounded-full" aria-hidden />
        </div>

        <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 flex-1 flex flex-col pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certificates.map((certificate) => (
              <AnimatedBorder
                key={certificate.title}
                rounded="lg"
                className="hover:shadow-xl hover:ring-1 hover:ring-rose-200/70 dark:hover:ring-rose-900/50 transition-all duration-300 transform hover:-translate-y-1"
                innerClass="bg-rose-50/30 dark:bg-stone-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  className="w-full text-left cursor-pointer group"
                  aria-label={`Ver certificado: ${certificate.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <Image
                      src={certificate.thumbnail}
                      alt={certificate.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-50 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                        Ver certificado
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                      {certificate.title}
                    </h3>
                  </div>
                </button>
              </AnimatedBorder>
            ))}
          </div>
        </div>

        {selectedCertificate && (
          <dialog
            ref={dialogRef}
            className="bg-transparent overflow-visible max-w-5xl w-full p-4"
            onClick={handleBackdropClick}
          >
            <div
              ref={modalScrollRef}
              data-certificate-modal-content
              className="scrollbar-hide bg-white dark:bg-stone-900 rounded-lg w-full max-h-[85vh] overflow-y-auto relative transform scale-95 opacity-0 transition-all duration-300 ease-out ring-1 ring-rose-100 dark:ring-rose-950/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-4 text-center">
                  {selectedCertificate.title}
                </h2>
                <div className="relative w-full min-h-[50vh] flex items-center justify-center bg-stone-50 dark:bg-stone-950 rounded-lg p-2">
                  <Image
                    src={selectedCertificate.fullImage}
                    alt={selectedCertificate.title}
                    width={916}
                    height={682}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-md"
                    priority
                  />
                </div>
              </div>
            </div>
          </dialog>
        )}
      </SectionBackdrop>
    </div>
  );
});

export default Certificates;
