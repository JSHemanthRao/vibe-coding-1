import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './PremiumSections.css';

export const FollowingPointer = () => {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.35 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX - 17);
      y.set(event.clientY - 17);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [x, y]);

  return (
    <motion.div className="following-pointer" style={{ x: springX, y: springY, willChange: "transform" }} aria-hidden="true">
      <span />
    </motion.div>
  );
};
