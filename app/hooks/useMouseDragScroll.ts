"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, option, label, [role='button'], [contenteditable='true']";

const HORIZONTAL_SCROLL_AREA = "[data-no-vertical-drag-scroll]";

const DRAG_THRESHOLD = 8;

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
    let dragging = false;
    let startY = 0;
    let startScroll = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (!el.contains(e.target as Node)) return;
      if (skipDrag(e.target)) return;
      e.stopPropagation();
      down = true;
      dragging = false;
      startY = e.clientY;
      startScroll = el.scrollTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!down) return;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        document.body.style.userSelect = "none";
      }
      el.scrollTop = startScroll - dy;
      e.preventDefault();
    };

    const onMouseUp = () => {
      if (!down) return;
      down = false;
      dragging = false;
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
