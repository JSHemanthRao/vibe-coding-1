import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const isHovering = hovering || localIsHovering;
  const activePosition = isStatic ? position : mousePosition;

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
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden pointer-events-none z-50 rounded-full flex items-center justify-center"
          style={{
            maskImage: `radial-gradient(circle ${lensSize / 2}px at ${activePosition.x}px ${activePosition.y}px, black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${activePosition.x}px ${activePosition.y}px, black 100%, transparent 100%)`,
            transformOrigin: `${activePosition.x}px ${activePosition.y}px`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${activePosition.x}px ${activePosition.y}px`,
            }}
          >
            {children}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};
