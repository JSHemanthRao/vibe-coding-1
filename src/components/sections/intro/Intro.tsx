import React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';
import { HeroHighlight, Highlight } from '../../ui/HeroHighlight';
import MagicRings from '../../MagicRings';
import { fadeUp, images, introMetricsLabels } from '../../../constants';
import '../../PremiumSections.css';

export const Intro = React.memo(() => {
  return (
    <section id="intro" className="premium-section flow-intro relative min-h-[82vh] bg-transparent z-20">
      <HeroHighlight containerClassName="flow-highlight-shell min-h-[82vh] items-center justify-start" className="w-full">
        <div className="flow-shell grid items-center gap-12 px-6 py-28 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-20 text-left"
          >
            <p className="flow-kicker">The field expands after the first signal</p>
            <h2 className="flow-editorial max-w-5xl">
              Sharvex is an operating layer for teams that need <Highlight className="flow-highlight-word">elite execution</Highlight> without institutional drag.
            </h2>
            <p className="flow-copy mt-8 max-w-2xl">
              We connect founders, operators, and technical leaders to a private network of builders who can move from strategy to shipped reality with precision.
            </p>
            <div className="intro-metrics mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {introMetricsLabels.map((label, index) => (
                <motion.div
                  key={label}
                  className="intro-metric"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <span>{label}</span>
                  <small>{index === 0 ? 'Signal' : index === 1 ? 'Network' : 'Capacity'}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="intro-visual relative min-h-[420px]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <img loading="lazy" decoding="async" src={images.darkCity} alt="Dark city skyline" className="intro-visual-image" />
            <div className="intro-visual-grid" />
            <div className="intro-rings-wrapper">
              <MagicRings 
                ringCount={4} 
                speed={0.8} 
                opacity={0.6}
                color="#ffffff"
                colorTwo="#444444"
              />
            </div>
            <motion.div
              className="intro-signal-panel"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LineChart size={22} />
              <div>
                <span>Capital-grade talent routing</span>
                <small>Live capacity index</small>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </HeroHighlight>
    </section>
  );
});
