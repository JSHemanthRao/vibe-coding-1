import React from 'react';
import { motion } from 'framer-motion';
import { Code2, PenTool, LineChart, Globe2 } from 'lucide-react';
import { BentoGrid } from '../../ui/BentoGrid';
import { GlareCard } from '../../ui/GlareCard';
import { WobbleCard } from '../../ui/WobbleCard';
import { fadeUp, images } from '../../../constants';
import '../../PremiumSections.css';

export const Features = React.memo(() => {
  return (
    <section id="services" className="premium-section feature-flow py-32 relative px-6 z-20">
      <motion.div
        className="flow-shell mx-auto mb-16 grid items-end gap-8 md:grid-cols-[0.9fr_0.7fr]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div>
          <p className="flow-kicker">Elite capabilities</p>
          <h2 className="flow-title">One standard of execution, tuned for decisive teams.</h2>
        </div>
        <p className="flow-copy">
          Each capability sits inside the same environment: dark imagery, quiet data structure, and interaction that rewards attention without shouting.
        </p>
      </motion.div>

      <BentoGrid className="feature-bento max-w-7xl md:auto-rows-[23rem]">
        <WobbleCard containerClassName="cinematic-card feature-card col-span-1 md:col-span-2 min-h-[23rem] group rounded-lg">
          <img loading="lazy" decoding="async" src={images.darkTechnology} alt="Dark technology systems" className="card-image" />
          <div className="card-gradient" />
          <div className="card-scan" />
          <div className="card-content">
            <Code2 className="card-icon" />
            <p className="card-kicker">Engineering</p>
            <h3>Architecture with operating discipline.</h3>
            <p>Senior developers for resilient platforms, intelligent workflows, and technical decisions that compound.</p>
          </div>
        </WobbleCard>

        <div className="cinematic-card feature-card monochrome-glare col-span-1 min-h-[23rem] group rounded-lg">
          <GlareCard className="relative h-full w-full overflow-hidden p-8">
            <img loading="lazy" decoding="async" src={images.blackAbstract} alt="Black abstract product surface" className="card-image" />
            <div className="card-gradient" />
            <div className="card-content">
              <PenTool className="card-icon" />
              <p className="card-kicker">Product design</p>
              <h3>Interfaces that feel inevitable.</h3>
              <p>Clear UX strategy, design systems, and product surfaces made for high-trust decisions.</p>
            </div>
          </GlareCard>
        </div>

        <div className="cinematic-card feature-card monochrome-glare col-span-1 min-h-[23rem] group rounded-lg">
          <GlareCard className="relative h-full w-full overflow-hidden p-8">
            <img loading="lazy" decoding="async" src={images.financeDashboard} alt="Dark finance analytics dashboard" className="card-image" />
            <div className="card-gradient" />
            <div className="card-content">
              <LineChart className="card-icon" />
              <p className="card-kicker">Strategic growth</p>
              <h3>Signal, pricing, and expansion loops.</h3>
              <p>Positioning, acquisition systems, and growth architecture for markets that move quickly.</p>
            </div>
          </GlareCard>
        </div>

        <WobbleCard containerClassName="cinematic-card feature-card col-span-1 md:col-span-2 min-h-[23rem] group rounded-lg">
          <img loading="lazy" decoding="async" src={images.darkCityNight} alt="Dark global city network" className="card-image" />
          <div className="card-gradient" />
          <div className="card-scan card-scan-alt" />
          <div className="card-content">
            <Globe2 className="card-icon" />
            <p className="card-kicker">Global network</p>
            <h3>Borderless execution, filtered for trust.</h3>
            <p>Private access to designers, engineers, and operators already calibrated for high-stakes work.</p>
          </div>
        </WobbleCard>
      </BentoGrid>
    </section>
  );
});
