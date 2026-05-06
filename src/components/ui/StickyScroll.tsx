import React, { useRef, useMemo } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const currentCardRef = useRef(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;
  const cardsBreakpoints = useMemo(() => content.map((_, index) => index / cardLength), [cardLength]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let closestBreakpointIndex = 0;
    let minDistance = Math.abs(latest - cardsBreakpoints[0]);

    for (let i = 1; i < cardsBreakpoints.length; i++) {
      const distance = Math.abs(latest - cardsBreakpoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestBreakpointIndex = i;
      }
    }

    if (closestBreakpointIndex !== currentCardRef.current) {
      currentCardRef.current = closestBreakpointIndex;
      setActiveCard(closestBreakpointIndex);
    }
  });

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-neutral-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg text-neutral-400 max-w-sm mt-10 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        className={
          "hidden lg:flex items-center justify-center h-60 w-80 rounded-md bg-neutral-900 sticky top-10 overflow-hidden"
        }
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};
