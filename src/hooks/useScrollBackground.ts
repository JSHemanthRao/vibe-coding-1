import { useEffect, useRef } from 'react';

/**
 * useScrollBackground - High-performance scroll tracking for background effects.
 * Mutates CSS variables directly to bypass React reconciliation.
 */
export const useScrollBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let frame = 0;

    const updateBackgroundOffset = () => {
      const rect = element.getBoundingClientRect();
      const sectionScroll = Math.max(0, -rect.top);

      // High-perf CSS variable mutation
      element.style.setProperty('--premium-bg-shift', `${sectionScroll * 0.07}px`);
      element.style.setProperty('--premium-bg-drift', `${sectionScroll * 0.035}px`);
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateBackgroundOffset);
    };

    updateBackgroundOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return containerRef;
};
