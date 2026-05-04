import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../../utils/cn";

export const Lens = ({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  position = { x: 200, y: 150 },
  isStatic = false,
  isFocusing = () => false,
  hovering = false,
  setHovering = () => {},
  className,
}: {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localIsHovering, setLocalIsHovering] = useState(false);
  const mouseX = useMotionValue(position.x);
  const mouseY = useMotionValue(position.y);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !isStatic) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const isHovering = hovering || localIsHovering;

  const clipPath = useMotionTemplate`circle(${lensSize / 2}px at ${mouseX}px ${mouseY}px)`;
  const transformOrigin = useMotionTemplate`${mouseX}px ${mouseY}px`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden z-20", className)}
      onMouseEnter={() => {
        setLocalIsHovering(true);
        setHovering(true);
      }}
      onMouseLeave={() => {
        setLocalIsHovering(false);
        setHovering(false);
      }}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isStatic || isHovering ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.58, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transform: "translateZ(0)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden pointer-events-none z-50 rounded-full flex items-center justify-center"
          style={{
            clipPath: clipPath,
            WebkitClipPath: clipPath,
            transformOrigin: transformOrigin,
            willChange: "transform, clip-path, filter"
          }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `scale(${zoomFactor}) translateZ(0)`,
              transformOrigin: transformOrigin,
              willChange: "transform"
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};
