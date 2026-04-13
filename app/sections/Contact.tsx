"use client";

import { useId, useRef, useState } from "react";
import SectionVenomBackdrop from "@/app/components/SectionVenomBackdrop";
import { useMouseDragScroll } from "@/app/hooks/useMouseDragScroll";

export default function Contact() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useMouseDragScroll(scrollRef);
  const statusId = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot (should stay empty)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus({ type: "idle" });
    setIsSubmitting(true);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name.length < 2) {
      setStatus({ type: "error", message: "Por favor, ingresá un nombre válido." });
      setIsSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Por favor, ingresá un email válido." });
      setIsSubmitting(false);
      return;
    }
    if (message.length < 10) {
      setStatus({ type: "error", message: "Contame un poco más (mínimo 10 caracteres)." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: formData.website, // honeypot
        }),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };

      if (!res.ok || data?.ok === false) {
        const msg =
          res.status === 429
            ? "Estás enviando demasiados mensajes. Probá de nuevo en un minuto."
            : data?.error || "No se pudo enviar el mensaje. Probá de nuevo más tarde.";
        setStatus({ type: "error", message: msg });
        setIsSubmitting(false);
        return;
      }

      setStatus({ type: "success", message: "¡Listo! Tu mensaje fue enviado. Te respondo a la brevedad." });
      setFormData({ name: "", email: "", message: "", website: "" });
      setIsSubmitting(false);
    } catch {
      setStatus({
        type: "error",
        message: "No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide relative w-full h-full flex flex-col rounded-2xl shadow-xl ring-1 ring-rose-100/70 dark:ring-rose-950/40 p-1 sm:p-2 lg:p-3 overflow-y-auto min-h-screen"
    >
      <SectionVenomBackdrop>
      <div className="text-center mb-8">
        <h1 className="section-heading text-4xl font-bold tracking-tight mb-2">
          Contacto
        </h1>
        <div className="accent-rule w-24 h-1 mx-auto rounded-full" aria-hidden />
      </div>

      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 flex-1">
        {/* Contact Form */}
        <div className="bg-rose-50/50 dark:bg-stone-800 rounded-lg p-6 ring-1 ring-rose-100/60 dark:ring-stone-700">
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-50 mb-6">
            Envíame un mensaje
          </h2>

          <p className="text-sm text-stone-600 dark:text-stone-200 mb-4">
            Usá este formulario para contactarme. No compartas contraseñas ni información sensible. Tu email se usa
            únicamente para responderte.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby={statusId}>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500/40 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                maxLength={254}
                autoComplete="email"
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500/40 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50"
                placeholder="Ejemplo: tu-mail@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                minLength={10}
                maxLength={2000}
                className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500/40 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 resize-none"
                placeholder="Tu mensaje"
              />
            </div>

            <div id={statusId} aria-live="polite" className="min-h-[1.25rem]">
              {status.type === "success" ? (
                <p className="text-sm text-green-700 dark:text-green-300">{status.message}</p>
              ) : status.type === "error" ? (
                <p className="text-sm text-red-700 dark:text-red-300">{status.message}</p>
              ) : (
                <span className="text-sm text-transparent select-none">.</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-rose-600 to-red-700 text-white font-medium py-3 px-6 rounded-lg hover:from-rose-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-rose-600/20"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-rose-50/50 dark:bg-stone-800 rounded-lg p-6 ring-1 ring-rose-100/60 dark:ring-stone-700">
            <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-50 mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-700 dark:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Email</p>
                  <p className="text-stone-900 dark:text-stone-50">nacholedesma33@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-700 dark:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Teléfono</p>
                  <p className="text-stone-900 dark:text-stone-50">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-700 dark:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Ubicación</p>
                  <p className="text-stone-900 dark:text-stone-50">Cordoba Capital, Cordoba</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-rose-50/50 dark:bg-stone-800 rounded-lg p-6 ring-1 ring-rose-100/60 dark:ring-stone-700">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-4">
              Redes Sociales
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com/NachoLedesma33" className="w-10 h-10 bg-stone-200 dark:bg-stone-600 rounded-full flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
                <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/nacho-ledesma" className="w-10 h-10 bg-stone-200 dark:bg-stone-600 rounded-full flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
                <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
      </SectionVenomBackdrop>
    </div>
  );
}
