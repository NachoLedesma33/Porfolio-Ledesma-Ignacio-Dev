"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, option, label, [role='button'], [contenteditable='true']";

/** Contenedores con scroll horizontal propio: no iniciar arrastre vertical aquí. */
const HORIZONTAL_SCROLL_AREA = "[data-no-vertical-drag-scroll]";

/**
 * Scroll vertical con el ratón (arrastrar) sobre un contenedor con overflow-y.
 * No interfiere con enlaces ni controles. Solo botón principal del ratón.
 * El gesto no se propaga al Swiper padre.
 */
export function useMouseDragScroll(
  scrollRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = scrollRef.current;
    if (!el) return;

    const skipDrag = (target: EventTarget | null) =>
      target instanceof Element &&
      (!!target.closest(INTERACTIVE_SELECTOR) ||
        !!target.closest(HORIZONTAL_SCROLL_AREA));

    let down = false;
    let startY = 0;
    let startScroll = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (!el.contains(e.target as Node)) return;
      if (skipDrag(e.target)) return;
      e.stopPropagation();
      down = true;
      startY = e.clientY;
      startScroll = el.scrollTop;
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!down) return;
      el.scrollTop = startScroll - (e.clientY - startY);
      e.preventDefault();
    };

    const onMouseUp = () => {
      if (!down) return;
      down = false;
      document.body.style.userSelect = "";
    };

    el.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, [enabled, scrollRef]);
}
