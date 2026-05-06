import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContainerScroll } from '../../ui/ContainerScrollAnimation';
import { Lens } from '../../ui/Lens';
import { ParallaxScroll } from '../../ui/ParallaxScroll';
import MagicRings from '../../MagicRings';
import { images, parallaxImages } from '../../../constants';
import '../../PremiumSections.css';

export const Showcase = React.memo(() => {
  const [hovering, setHovering] = useState(false);

  return (
    <section id="work" className="premium-section showcase-flow flex flex-col overflow-hidden relative z-20 pt-10">
      <MagicRings 
        id="magic-rings-showcase" 
        ringCount={5} 
        speed={0.4} 
        opacity={0.3} 
        color="#333333" 
        colorTwo="#111111" 
        baseRadius={0.5}
      />
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <motion.div
              className="showcase-title mb-12"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
               <img loading="lazy" decoding="async" src={images.darkTechnologyAlt} alt="Dark technology command surface" className="showcase-lens-image" />
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
        className="showcase-parallax mt-10 md:mt-16 relative z-20 pb-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <ParallaxScroll images={parallaxImages} />
      </motion.div>
    </section>
  );
});
