import { useRef, useCallback } from "react";

/**
 * useGlare - Logic controller for interactive card glare effects.
 * Separates event calculation from UI rendering for scalability.
 */
export const useGlare = () => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  const updateStyles = useCallback(() => {
    const el = refElement.current;
    if (!el) return;
    
    const { background, rotate, glare } = state.current;
    el.style.setProperty("--m-x", `${glare.x}%`);
    el.style.setProperty("--m-y", `${glare.y}%`);
    el.style.setProperty("--r-x", `${rotate.x}deg`);
    el.style.setProperty("--r-y", `${rotate.y}deg`);
    el.style.setProperty("--bg-x", `${background.x}%`);
    el.style.setProperty("--bg-y", `${background.y}%`);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rotateFactor = 0.4;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    };
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    };

    const { background, rotate, glare } = state.current;
    background.x = 50 + percentage.x / 4 - 12.5;
    background.y = 50 + percentage.y / 3 - 16.67;
    rotate.x = -(delta.y * rotateFactor) * 2;
    rotate.y = delta.x * rotateFactor * 2;
    glare.x = percentage.x;
    glare.y = percentage.y;

    updateStyles();
  }, [updateStyles]);

  const handlePointerEnter = useCallback(() => {
    isPointerInside.current = true;
    setTimeout(() => {
      if (isPointerInside.current) {
        refElement.current?.style.setProperty("--duration", "0s");
      }
    }, 300);
  }, []);

  const handlePointerLeave = useCallback(() => {
    isPointerInside.current = false;
    const el = refElement.current;
    if (el) {
      el.style.removeProperty("--duration");
      el.style.setProperty("--r-x", `0deg`);
      el.style.setProperty("--r-y", `0deg`);
    }
  }, []);

  return {
    refElement,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  };
};
