import { useState, useEffect, useMemo, RefObject } from 'react';
import { useInView } from 'framer-motion';

type ViewportLevel = 'light' | 'medium' | 'heavy';

/**
 * useViewportVisibility - Hook for phased rendering and visibility signaling.
 * Handles different intersection margins based on section intensity.
 */
export const useViewportVisibility = (
  ref: RefObject<HTMLElement | null>,
  level: ViewportLevel,
  onVisibilityChange?: (visible: boolean) => void
) => {
  const [hasEntered, setHasEntered] = useState(level === 'light');

  const margins = useMemo(() => ({
    light: "0px",
    medium: "800px 0px 800px 0px",
    heavy: "300px 0px 300px 0px"
  }), []);

  const isInView = useInView(ref, {
    once: level === 'medium',
    margin: margins[level] as any
  });

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isInView);
    }
  }, [isInView, onVisibilityChange]);

  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true);
    }
  }, [isInView, hasEntered]);

  return { isInView, hasEntered };
};
