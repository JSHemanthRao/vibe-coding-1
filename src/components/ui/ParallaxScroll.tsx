import { useMemo } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // Memoize slicing
  const { firstPart, secondPart, thirdPart } = useMemo(() => {
    const third = Math.ceil(images.length / 3);
    return {
      firstPart: images.slice(0, third),
      secondPart: images.slice(third, 2 * third),
      thirdPart: images.slice(2 * third),
    };
  }, [images]);

  const renderColumn = (items: string[], direction: "up" | "down", speed: string) => {
    // Duplicate array for seamless infinite looping
    const duplicated = [...items, ...items, ...items];
    return (
      <div className="relative overflow-hidden h-[800px] w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div 
          className={cn(
            "flex flex-col gap-8 w-full absolute top-0 left-0 hover:[animation-play-state:paused]", 
            direction === "up" ? "animate-v-scroll-up" : "animate-v-scroll-down"
          )}
          style={{ animationDuration: speed }}
        >
          {duplicated.map((el, idx) => (
            <ImageCard key={`grid-img-${idx}`} src={el} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("w-full overflow-hidden relative", className)}>
      <style>
        {`
          @keyframes v-scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.3333%); }
          }
          @keyframes v-scroll-down {
            0% { transform: translateY(-33.3333%); }
            100% { transform: translateY(0); }
          }
          .animate-v-scroll-up {
            animation: v-scroll-up linear infinite;
            height: max-content;
          }
          .animate-v-scroll-down {
            animation: v-scroll-down linear infinite;
            height: max-content;
          }
        `}
      </style>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8 px-6">
        {/* Column 1: Scrolls Up */}
        {renderColumn(firstPart, "up", "35s")}
        
        {/* Column 2: Scrolls Down */}
        <div className="hidden md:block">
          {renderColumn(secondPart, "down", "45s")}
        </div>

        {/* Column 3: Scrolls Up */}
        <div className="hidden lg:block">
          {renderColumn(thirdPart, "up", "30s")}
        </div>
      </div>
    </div>
  );
};

// Memoized individual card
const ImageCard = ({ src }: { src: string }) => {
  return (
    <motion.div 
      className="will-change-transform rounded-xl overflow-hidden shadow-lg border border-white/[0.08] relative shrink-0"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={src}
        loading="lazy"                 
        decoding="async"              
        className="h-72 w-full object-cover"
        alt="thumbnail"
      />
    </motion.div>
  );
};