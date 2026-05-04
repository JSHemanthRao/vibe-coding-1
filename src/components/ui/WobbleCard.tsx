import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const invertedX = useTransform(x, (val) => -val);
  const invertedY = useTransform(y, (val) => -val);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (clientX - (rect.left + rect.width / 2)) / 20;
    const ny = (clientY - (rect.top + rect.height / 2)) / 20;
    mouseX.set(nx);
    mouseY.set(ny);
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
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
};
