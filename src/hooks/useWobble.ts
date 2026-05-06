import { useState, useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * useWobble - Animation controller for spring-based card wobbling.
 * Offloads physics calculation from the UI layer.
 */
export const useWobble = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const invertedX = useTransform(x, (val) => -val);
  const invertedY = useTransform(y, (val) => -val);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (clientX - (rect.left + rect.width / 2)) / 20;
    const ny = (clientY - (rect.top + rect.height / 2)) / 20;
    mouseX.set(nx);
    mouseY.set(ny);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return {
    x,
    y,
    invertedX,
    invertedY,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
