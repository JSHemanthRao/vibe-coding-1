import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Compass,
  Globe2,
  LineChart,
  Network,
  PenTool,
  ShieldCheck,
  Target,
} from 'lucide-react';
import './PremiumSections.css';

import { TracingBeam } from './ui/TracingBeam';
import { StickyScroll } from './ui/StickyScroll';
import { ContainerScroll } from './ui/ContainerScrollAnimation';
import { InfiniteMovingCards } from './ui/InfiniteMovingCards';
import { Spotlight } from './ui/Spotlight';
import { HoverBorderGradient } from './ui/HoverBorderGradient';
import { BentoGrid } from './ui/BentoGrid';
import { GlareCard } from './ui/GlareCard';
import { WobbleCard } from './ui/WobbleCard';
import { Lens } from './ui/Lens';
import { ParallaxScroll } from './ui/ParallaxScroll';
import { HeroHighlight, Highlight } from './ui/HeroHighlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageParams = 'auto=format&fit=crop&q=80&sat=-100';
const pexelsParams = 'auto=compress&cs=tinysrgb&w=2100';

const images = {
  financeDashboard:
    `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${imageParams}&w=2100`,
  financeData:
    `https://images.unsplash.com/photo-1551288049-bebda4e38f71?${imageParams}&w=2100`,
  blackAbstract:
    `https://images.unsplash.com/photo-1541701494587-cb58502866ab?${imageParams}&w=2100`,
  blackAbstractField:
    `https://images.unsplash.com/photo-1557672172-298e090bd0f1?${imageParams}&w=2100`,
  darkCity:
    `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?${imageParams}&w=2100`,
  darkCityNight:
    `https://images.unsplash.com/photo-1519501025264-65ba15a82390?${imageParams}&w=2100`,
  darkTechnology:
    `https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?${pexelsParams}`,
  darkTechnologyAlt:
    `https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?${pexelsParams}`,
  darkTechnologyGrid:
    `https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?${pexelsParams}`,
  avatarOne:
    `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?${imageParams}&w=400`,
  avatarTwo:
    `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?${imageParams}&w=400`,
  avatarThree:
    `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?${imageParams}&w=400`,
  avatarFour:
    `https://images.unsplash.com/photo-1580489944761-15a19d654956?${imageParams}&w=400`,
};

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
    <motion.div className="following-pointer" style={{ x: springX, y: springY }} aria-hidden="true">
      <span />
    </motion.div>
  );
};

const PremiumSections = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = backgroundRef.current;
    if (!element) return;

    let frame = 0;

    const updateBackgroundOffset = () => {
      const rect = element.getBoundingClientRect();
      const sectionScroll = Math.max(0, -rect.top);

      element.style.setProperty('--premium-bg-shift', `${sectionScroll * 0.07}px`);
      element.style.setProperty('--premium-bg-drift', `${sectionScroll * 0.035}px`);
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateBackgroundOffset);
    };

    updateBackgroundOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="premium-sections relative w-full overflow-hidden text-white z-10">
      <div className="premium-background-system" aria-hidden="true">
        <div className="premium-bg-layer premium-bg-base" />
        <div className="premium-bg-layer premium-bg-structure" />
        <div className="premium-bg-layer premium-bg-depth" />
        <div className="premium-bg-layer premium-bg-noise" />
        <div className="premium-bg-vignette" />
      </div>

      <div className="premium-content relative z-20">
        <Section1Intro />
        <Section2Features />
        <Section3Process />
        <Section4Showcase />
        <Section5Testimonials />
        <Section6Statement />
        <Section7CTA />
        <Footer />
      </div>
    </div>
  );
};

const Section1Intro = () => {
  return (
    <section className="premium-section flow-intro relative min-h-[82vh] bg-transparent z-20">
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
              {['Vetted', 'Global', 'On-demand'].map((label, index) => (
                <motion.div
                  key={label}
                  className="intro-metric"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.08, duration: 0.7 }}
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
            transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <img src={images.darkCity} alt="Dark city skyline" className="intro-visual-image" />
            <div className="intro-visual-grid" />
            <div className="intro-orbit intro-orbit-one" />
            <div className="intro-orbit intro-orbit-two" />
            <motion.div
              className="intro-signal-panel"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
};

const Section2Features = () => {
  return (
    <section className="premium-section feature-flow py-32 relative px-6 z-20">
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
          <img src={images.darkTechnology} alt="Dark technology systems" className="card-image" />
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
            <img src={images.blackAbstract} alt="Black abstract product surface" className="card-image" />
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
            <img src={images.financeDashboard} alt="Dark finance analytics dashboard" className="card-image" />
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
          <img src={images.darkCityNight} alt="Dark global city network" className="card-image" />
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
};

const Section3Process = () => {
  const content = [
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
  ];

  return (
    <section className="premium-section process-flow py-32 relative z-20 bg-transparent">
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
            transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="process-grid-lines" />
            <StickyScroll content={content} />
          </motion.div>
        </div>
      </TracingBeam>
    </section>
  );
};

const ProcessVisual = ({ image, icon, label }: { image: string; icon: React.ReactNode; label: string }) => (
  <div className="process-visual group">
    <img src={image} className="process-visual-image" alt={label} />
    <div className="process-visual-overlay" />
    <div className="process-visual-grid" />
    <div className="process-visual-icon">{icon}</div>
    <span>{label}</span>
  </div>
);

const Section4Showcase = () => {
  const [hovering, setHovering] = useState(false);

  const parallaxImages = [
    images.darkTechnology,
    images.darkTechnologyAlt,
    images.financeDashboard,
    images.blackAbstract,
    images.financeData,
    images.darkCityNight,
    images.darkTechnologyGrid,
    images.blackAbstractField,
    images.darkCity,
  ];

  return (
    <section className="premium-section showcase-flow flex flex-col overflow-hidden relative z-20 pt-10">
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <motion.div
              className="showcase-title mb-12"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p className="flow-kicker text-center">Cinematic portfolio</p>
              <h1>
                Proof should feel like atmosphere.
                <span>Flawless execution</span>
              </h1>
              <p className="flow-copy mx-auto mt-6 max-w-2xl text-center">
                Every surface is designed to behave like a live investment interface: layered, quiet, and full of signal.
              </p>
            </motion.div>
          }
        >
          <Lens hovering={hovering} setHovering={setHovering} zoomFactor={1.5} lensSize={250} className="w-full h-full">
            <div className="showcase-lens-panel group">
               <img src={images.darkTechnologyAlt} alt="Dark technology command surface" className="showcase-lens-image" />
              <div className="showcase-lens-grid" />
              <div className="showcase-lens-shade" />
              <p>
                "A talent-entry system connecting visionaries with top-tier developers, designers, and strategists."
              </p>
            </div>
          </Lens>
        </ContainerScroll>
      </div>

      <motion.div
        className="showcase-parallax mt-[-20vh] relative z-20 pb-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <ParallaxScroll images={parallaxImages} />
      </motion.div>
    </section>
  );
};

const Section5Testimonials = () => {
  const testimonials = [
    {
      quote: 'Sharvex brought the exact technical rigor and speed we needed when every product decision mattered.',
      name: 'Michael R.',
      title: 'CTO, Global Tech Platform',
      avatar: images.avatarOne,
    },
    {
      quote: 'They operate like a strategy room, product team, and founder ally in one disciplined network.',
      name: 'Sarah J.',
      title: 'Founder and CEO, E-Commerce Group',
      avatar: images.avatarTwo,
    },
    {
      quote: 'The design work felt surgical. Fewer revisions, better questions, stronger outcomes.',
      name: 'David W.',
      title: 'VP of Product, FinTech Portfolio',
      avatar: images.avatarThree,
    },
    {
      quote: 'Their talent model turns complex engineering growth into a system the whole organization can scale.',
      name: 'Elena T.',
      title: 'Head of Engineering, Enterprise Software',
      avatar: images.avatarFour,
    },
  ];

  return (
    <section className="premium-section testimonials-flow relative z-20 min-h-[52rem] overflow-hidden px-6 py-32">
      <div className="flow-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="flow-kicker">Client voice</p>
          <h2 className="flow-title">Quiet confidence from teams that move under pressure.</h2>
          <p className="flow-copy mt-6">
            The testimony layer is glass, motion, and human proof: moving signals below, stacked voices above.
          </p>
          <CardStack items={testimonials} />
        </motion.div>

        <motion.div
          className="testimonial-marquee-shell"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <img src={images.financeDashboard} alt="Financial dashboard glow" className="testimonial-bg-image" />
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" className="testimonial-marquee" />
          <InfiniteMovingCards items={[...testimonials].reverse()} direction="left" speed="normal" className="testimonial-marquee testimonial-marquee-secondary" />
        </motion.div>
      </div>
    </section>
  );
};

const CardStack = ({ items }: { items: { quote: string; name: string; title: string; avatar?: string }[] }) => (
  <div className="testimonial-stack" aria-label="Featured client notes">
    {items.slice(0, 3).map((item, index) => (
      <motion.article
        key={item.name}
        className="stack-card"
        style={{ '--stack-index': index } as React.CSSProperties}
        initial={{ opacity: 0, y: 24, rotate: -2 + index }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 + index }}
        whileHover={{ y: -10, rotate: 0 }}
        transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {item.avatar && <img src={item.avatar} alt={item.name} />}
        <p>{item.quote}</p>
        <span>{item.name}</span>
        <small>{item.title}</small>
      </motion.article>
    ))}
  </div>
);

const Section6Statement = () => {
  return (
    <section className="premium-section statement-flow flex min-h-[78vh] w-full items-center justify-center overflow-hidden px-6 py-32 relative z-20">
      <motion.img
        src={images.blackAbstractField}
        alt="Abstract market field"
        className="statement-image"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
};

const Section7CTA = () => {
  return (
    <section className="premium-section cta-flow relative min-h-[54rem] flex items-center justify-center w-full z-20 overflow-hidden px-6">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="cta-vortex" aria-hidden="true" />
      <motion.img
        src={images.darkCity}
        alt="Dark institutional skyline"
        className="cta-image"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      />

      <motion.div
        className="cta-content relative z-10 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
        >
          <span>Hire Elite Talent</span>
          <ArrowUpRight size={20} className="text-neutral-400" />
        </HoverBorderGradient>
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="premium-section footer-flow w-full border-t border-white/[0.08] px-6 pb-12 pt-10 relative z-20 bg-transparent">
    <div className="footer-signal" aria-hidden="true" />
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 font-bold text-white uppercase">
        <ShieldCheck size={18} />
        <span>SHARVEX</span>
      </div>
      <p>Engineering | Product Design | Strategic Growth</p>
      <div className="flex gap-8 uppercase text-xs font-bold">
        <a href="#intro" className="hover:text-white transition-colors duration-300">Intro</a>
        <a href="#services" className="hover:text-white transition-colors duration-300">Services</a>
        <a href="#capital" className="hover:text-white transition-colors duration-300">Contact</a>
      </div>
    </div>
  </footer>
);

export default PremiumSections;
