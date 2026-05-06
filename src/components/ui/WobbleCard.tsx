import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useWobble } from "../../hooks/useWobble";

export const WobbleCard = React.memo(({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const { 
    x, y, invertedX, invertedY, isHovering, 
    handleMouseMove, handleMouseEnter, handleMouseLeave 
  } = useWobble();

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        willChange: "transform",
      }}
      className={cn(
        "mx-auto w-full bg-neutral-900 border border-white/10 relative rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.05),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.08), 0 24px 108px rgba(0, 0, 0, 0.10)",
        }}
      >
        <motion.div
          style={{
            x: invertedX,
            y: invertedY,
            willChange: "transform",
          }}
          animate={{
            scale: isHovering ? 1.03 : 1,
          }}
          transition={{
            scale: { duration: 0.1, ease: "easeOut" },
          }}
          className={cn("h-full px-4 py-20 sm:px-10", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
});
