import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, Compass, LineChart } from 'lucide-react';
import { TracingBeam } from '../../ui/TracingBeam';
import { StickyScroll } from '../../ui/StickyScroll';
import { fadeUp, images } from '../../../constants';
import '../../PremiumSections.css';

const ProcessVisual = React.memo(({ image, icon, label }: { image: string; icon: React.ReactNode; label: string }) => (
  <div className="process-visual group">
    <img loading="lazy" decoding="async" src={image} className="process-visual-image" alt={label} />
    <div className="process-visual-overlay" />
    <div className="process-visual-grid" />
    <div className="process-visual-icon">{icon}</div>
    <span>{label}</span>
  </div>
));

export const Process = React.memo(() => {
  const content = useMemo(() => [
    {
      title: 'Listen: define the signal',
      description: 'We reduce ambition, constraints, and urgency into a precise execution thesis before talent is introduced.',
      content: (
        <ProcessVisual image={images.financeData} icon={<Target className="process-icon" />} label="Signal capture" />
      ),
    },
    {
      title: 'Match: assemble the cell',
      description: 'We align scope, seniority, domain fit, and communication rhythm so the work starts clean.',
      content: (
        <ProcessVisual image={images.darkTechnologyAlt} icon={<Briefcase className="process-icon" />} label="Team architecture" />
      ),
    },
    {
      title: 'Move: execute with pressure',
      description: 'Design, engineering, and strategy advance as a coordinated system with visible checkpoints.',
      content: (
        <ProcessVisual image={images.blackAbstractField} icon={<Compass className="process-icon" />} label="Delivery rhythm" />
      ),
    },
    {
      title: 'Scale: keep compounding',
      description: 'The network remains close to the outcome through iteration, expansion, and new operating needs.',
      content: (
        <ProcessVisual image={images.darkCityNight} icon={<LineChart className="process-icon" />} label="Scale review" />
      ),
    },
  ], []);

  return (
    <section id="process" className="premium-section process-flow py-32 relative z-20 bg-transparent">
      <TracingBeam className="px-6 relative z-10">
        <div className="flow-shell mx-auto grid items-start gap-10 pt-10 lg:grid-cols-[0.65fr_1fr]">
          <motion.div
            className="process-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <p className="flow-kicker">Story / process</p>
            <h2 className="flow-title">The work starts before the code.</h2>
            <p className="flow-copy mt-6">
              A controlled scroll experience mirrors the way Sharvex operates: one decision, one reveal, one increasingly clear path.
            </p>
          </motion.div>

          <motion.div
            className="process-scroll-shell"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="process-grid-lines" />
            <StickyScroll content={content} />
          </motion.div>
        </div>
      </TracingBeam>
    </section>
  );
});
