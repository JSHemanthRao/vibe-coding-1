import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CityLayers from './CityLayers';
import './Hero.css';

const handleHireClick = () => {
  document.getElementById('capital')?.scrollIntoView({ behavior: 'smooth' });
};

const handleJoinClick = () => {
  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
};

const Hero = React.memo(() => {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.fromTo(".hero-tag", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(".hero-title", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(".hero-subtitle", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".hero-btns", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.1, ease: "power3.out" }
      );

      gsap.fromTo(".hero-bottom-badge", 
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.inOut" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={contentRef}>
      {/* Background Effect */}
      <div className="video-container">
        <CityLayers />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-tag">ELITE TALENT • GLOBAL NETWORK</div>
        <h1 className="hero-title">
          Architecting the next era <br />
          <span>of independent work.</span>
        </h1>
        <p className="hero-subtitle">
          Sharvex is an exclusive talent network connecting ambitious companies with world-class freelancers. We bridge the gap between vision and elite execution.
        </p>
        
        <div className="hero-btns">
          <button 
            className="btn-primary" 
            onClick={handleHireClick}
          >
            <span>Hire Elite Talent</span>
            <div className="btn-glow"></div>
          </button>
          <button 
            className="btn-secondary"
            onClick={handleJoinClick}
          >
            <span>Join Network</span>
          </button>
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="hero-bottom-badge">
        <span>Engineering. Design. Strategy.</span>
      </div>
    </section>
  );
});

export default Hero;
