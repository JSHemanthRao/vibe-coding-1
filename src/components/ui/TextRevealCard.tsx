import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement | any>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const widthPercentage = useMotionValue(0);
  const animatedWidth = useSpring(widthPercentage, { stiffness: 400, damping: 40 });

  useEffect(() => {
    if (cardRef.current) {
      setLeft(cardRef.current.getBoundingClientRect().left);
      setLocalWidth(cardRef.current.getBoundingClientRect().width);
    }
  }, []);

  function mouseMoveHandler(event: any) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      widthPercentage.set((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    widthPercentage.set(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  const clipPath = useMotionTemplate`inset(0 calc(100% - ${animatedWidth}%) 0 0)`;
  const leftStyle = useMotionTemplate`${animatedWidth}%`;
  const rotateStyle = useTransform(animatedWidth, (w) => (w === 100 ? 0 : isMouseOver ? w : 0));
  const opacityStyle = useTransform(animatedWidth, (w) => (w > 0 ? 1 : 0));

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#111] border border-white/[0.08] w-full rounded-2xl p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
            clipPath: isMouseOver ? clipPath : `inset(0 calc(100% - ${widthPercentage.get()}%) 0 0)`,
            opacity: isMouseOver ? opacityStyle : (widthPercentage.get() > 0 ? 1 : 0),
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#111] z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          style={{
            left: leftStyle,
            rotate: rotateStyle,
            opacity: opacityStyle,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-500 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] pointer-events-none">
          <p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#333]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  
  const starsData = useMemo(() => {
    return [...Array(80)].map(() => ({
      top: `${random() * 100}%`,
      left: `${random() * 100}%`,
      duration: random() * 10 + 20,
      opacity: randomOpacity()
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {starsData.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            x: [0, randomMove(), 0],
            y: [0, randomMove(), 0],
            opacity: [star.opacity, randomOpacity(), star.opacity],
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
            willChange: "transform, opacity",
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};
export const MemoizedStars = memo(Stars);
