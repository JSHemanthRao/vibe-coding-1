import React, { useEffect, useRef, lazy } from 'react';
import { PerformanceSection } from '../animations/PerformanceSection';
import { sceneManager } from '../three/SceneManager';
import '../PremiumSections.css';

// Light sections (Loaded immediately)
import { Intro as Section1Intro } from '../sections/intro/Intro';
import { Statement as Section6Statement } from '../sections/cta/Statement';
import { CTA as Section7CTA } from '../sections/cta/CTA';
import { Footer } from './Footer';

// Medium sections (Lazy loaded on approach)
const Section2Features = lazy(() => import('../sections/features/Features').then(m => ({ default: m.Features })));
const Section3Process = lazy(() => import('../sections/process/Process').then(m => ({ default: m.Process })));

// Heavy sections (Strict viewport-based mounting/unmounting)
const Section4Showcase = lazy(() => import('../sections/showcase/Showcase').then(m => ({ default: m.Showcase })));
const Section5Testimonials = lazy(() => import('../sections/testimonials/Testimonials').then(m => ({ default: m.Testimonials })));

import { useScrollBackground } from '../../hooks/useScrollBackground';

const PremiumSections = () => {
  const backgroundRef = useScrollBackground();

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
        {/* Phase 1: Immediate Paint */}
        <PerformanceSection level="light" onVisibilityChange={(v) => sceneManager.setEntityActive('magic-rings', v)}>
          <Section1Intro />
        </PerformanceSection>
        
        {/* Phase 2: Medium Load (Pre-mounted on approach) */}
        <PerformanceSection level="medium" placeholderHeight="1000px">
          <Section2Features />
        </PerformanceSection>

        <PerformanceSection level="medium" placeholderHeight="1200px">
          <Section3Process />
        </PerformanceSection>

        {/* Phase 3: Heavy Load (Dynamic Mount/Unmount) */}
        <PerformanceSection 
          level="heavy" 
          placeholderHeight="1600px"
          onVisibilityChange={(v) => sceneManager.setEntityActive('magic-rings-showcase', v)}
        >
          <Section4Showcase />
        </PerformanceSection>

        <PerformanceSection level="heavy" placeholderHeight="900px">
          <Section5Testimonials />
        </PerformanceSection>

        {/* Phase 1: Secondary Light Sections */}
        <PerformanceSection level="light">
          <Section6Statement />
        </PerformanceSection>

        <PerformanceSection level="light">
          <Section7CTA />
        </PerformanceSection>

        <PerformanceSection level="light">
          <Footer />
        </PerformanceSection>
      </div>
    </div>
  );
};

export default PremiumSections;
