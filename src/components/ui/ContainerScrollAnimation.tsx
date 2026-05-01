import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="py-12 md:py-24 flex flex-col items-center justify-center relative px-2 md:px-20">
      <div
        className="w-full relative flex flex-col items-center"
        style={{ perspective: "1000px" }}
      >
        <Header titleComponent={titleComponent} />
        <Card>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ titleComponent }: { titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-5xl mx-auto text-center mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ rotateX: 15, scale: 0.95, y: 60, opacity: 0 }}
      whileInView={{ rotateX: 0, scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
      className="max-w-5xl mx-auto h-[25rem] md:h-[35rem] w-full border-4 border-[#333333] p-2 md:p-6 bg-[#111111] rounded-[30px] shadow-2xl"
    >
      <div className="bg-[#050505] h-full w-full rounded-2xl gap-4 overflow-hidden relative">
        {children}
      </div>
    </motion.div>
  );
};
