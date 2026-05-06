import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useViewportVisibility } from '../../hooks/useViewportVisibility';

interface PerformanceSectionProps {
  children: React.ReactNode;
  level: 'light' | 'medium' | 'heavy';
  id?: string;
  className?: string;
  placeholderHeight?: string;
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * SectionSkeleton - High-performance placeholder
 * Uses strict containment to prevent layout thrashing
 */
const SectionSkeleton = React.memo(({ height }: { height: string }) => (
  <div 
    className="w-full flex items-center justify-center bg-black/10 animate-pulse border-y border-white/[0.02]"
    style={{ height, contain: 'strict' }}
  >
    <div className="flex flex-col items-center gap-5 opacity-30">
      <div className="w-10 h-10 border-t-2 border-neutral-700 rounded-full animate-spin"></div>
      <span className="text-neutral-600 text-[10px] font-mono uppercase tracking-[0.4em]">Synchronizing Viewport</span>
    </div>
  </div>
));

/**
 * PerformanceSection - god-level rendering orchestrator
 * - Phased rendering (Immediate, approach-based, viewport-based)
 * - Dynamic height tracking to eliminate cumulative layout shift (CLS)
 * - GPU promotion for heavy sections
 * - Memoized lifecycle to prevent unnecessary reconciliation
 */
export const PerformanceSection: React.FC<PerformanceSectionProps> = React.memo(({
  children,
  level,
  id,
  className = "",
  placeholderHeight = "800px",
  onVisibilityChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [actualHeight, setActualHeight] = useState<string>(placeholderHeight);
  const { isInView, hasEntered } = useViewportVisibility(ref, level, onVisibilityChange);

  // Self-correcting height tracking to ensure stable scroll position
  useEffect(() => {
    if (hasEntered && ref.current && level !== 'light') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newHeight = `${entry.borderBoxSize[0].blockSize}px`;
          setActualHeight(newHeight);
        }
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, [hasEntered, level]);

  // Rendering Logic:
  // - Light: Permanent
  // - Medium: Mount once entered margin, stay mounted
  // - Heavy: Mount only when in margin, unmount to clear GPU/Heap
  const isActive = level === 'light' || (level === 'medium' && hasEntered) || (level === 'heavy' && isInView);

  return (
    <div 
      ref={ref} 
      id={id} 
      className={`performance-wrapper ${className}`}
      style={{ 
        minHeight: isActive ? 'auto' : actualHeight,
        contentVisibility: level === 'light' ? 'visible' : 'auto',
        containIntrinsicSize: isActive ? 'auto' : actualHeight,
        willChange: isActive && level === 'heavy' ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)' // Force layer promotion
      }}
    >
      {isActive ? (
        <Suspense fallback={<SectionSkeleton height={actualHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton height={actualHeight} />
      )}
    </div>
  );
});
