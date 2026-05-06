import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteMovingCards } from '../../ui/InfiniteMovingCards';
import { fadeUp, images, testimonialsList } from '../../../constants';
import '../../PremiumSections.css';

const CardStack = React.memo(({ items }: { items: { quote: string; name: string; title: string; avatar?: string }[] }) => (
  <div className="testimonial-stack" aria-label="Featured client notes">
    {items.slice(0, 3).map((item, index) => (
      <motion.article
        key={item.name}
        className="stack-card"
        style={{ '--stack-index': index } as React.CSSProperties}
        initial={{ opacity: 0, y: 24, rotate: -2 + index }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 + index }}
        whileHover={{ y: -10, rotate: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {item.avatar && <img loading="lazy" decoding="async" src={item.avatar} alt={item.name} />}
        <p>{item.quote}</p>
        <span>{item.name}</span>
        <small>{item.title}</small>
      </motion.article>
    ))}
  </div>
));

export const Testimonials = React.memo(() => {
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
          <CardStack items={testimonialsList} />
        </motion.div>

        <motion.div
          className="testimonial-marquee-shell"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <img loading="lazy" decoding="async" src={images.financeDashboard} alt="Financial dashboard glow" className="testimonial-bg-image" />
          <InfiniteMovingCards items={testimonialsList} direction="right" speed="slow" className="testimonial-marquee" />
          <InfiniteMovingCards items={[...testimonialsList].reverse()} direction="left" speed="normal" className="testimonial-marquee testimonial-marquee-secondary" />
        </motion.div>
      </div>
    </section>
  );
});
