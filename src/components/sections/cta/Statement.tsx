import React from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '../../ui/TextGenerateEffect';
import { fadeUp, images } from '../../../constants';
import '../../PremiumSections.css';

export const Statement = React.memo(() => {
  return (
    <section className="premium-section statement-flow flex min-h-[78vh] w-full items-center justify-center overflow-hidden px-6 py-32 relative z-20">
      <motion.img
        src={images.blackAbstractField}
        alt="Abstract market field"
        className="statement-image"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="statement-content text-center relative z-10"
      >
        <p className="flow-kicker text-center">Point of view</p>
        <TextGenerateEffect
          words="We don't follow markets. We define them."
          className="statement-generated"
        />
        <p className="flow-copy mx-auto mt-8 max-w-2xl text-center">
          Sharvex is built for operators who need conviction, taste, and execution in the same room.
        </p>
      </motion.div>
    </section>
  );
});
