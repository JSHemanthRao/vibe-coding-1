import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowUpRight } from 'lucide-react';
import { Spotlight } from '../../ui/Spotlight';
import { HoverBorderGradient } from '../../ui/HoverBorderGradient';
import { fadeUp, images, handleCTAClick } from '../../../constants';
import '../../PremiumSections.css';

export const CTA = React.memo(() => {
  return (
    <section id="capital" className="premium-section cta-flow relative min-h-[54rem] flex items-center justify-center w-full z-20 overflow-hidden px-6">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="cta-vortex" aria-hidden="true" />
      <motion.img
        src={images.darkCity}
        alt="Dark institutional skyline"
        className="cta-image"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      />

      <motion.div
        className="cta-content relative z-10 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <Network size={56} strokeWidth={1} className="text-white mb-10 opacity-70 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        <p className="flow-kicker text-center">Private access</p>
        <h2>Build with the network behind the next decade.</h2>
        <p>
          For founders, agencies, and enterprises that need a disciplined path from ambition to execution.
        </p>
        <HoverBorderGradient
          containerClassName="cta-button rounded-full shadow-[0_0_38px_rgba(255,255,255,0.18)]"
          as="button"
          duration={1.4}
          className="bg-[#050505] text-white flex items-center space-x-3 px-10 py-5 text-sm uppercase font-bold"
          onClick={handleCTAClick}
        >
          <span>Hire Elite Talent</span>
          <ArrowUpRight size={20} className="text-neutral-400" />
        </HoverBorderGradient>
      </motion.div>
    </section>
  );
});
