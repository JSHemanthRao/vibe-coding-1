import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CityLayers.css';

// Using the absolute paths for now as they are generated in the appDataDir
// In a production environment, these would be in the assets folder.
import cityBase from '../assets/city-base.png';
import cityHighlight1 from '../assets/city-highlight-1.png';
import cityHighlight2 from '../assets/city-highlight-2.png';

const CityLayers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layersRef.current) return;

    // gsap.quickTo is the officially recommended, highly optimized way to track mouse movement
    // It creates a reusable tween and modifies it, avoiding creating new tweens 60 times a second.
    const xTo = gsap.quickTo(layersRef.current, "x", { duration: 1, ease: "power2.out" });
    const yTo = gsap.quickTo(layersRef.current, "y", { duration: 1, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * 40;

      xTo(xPos);
      yTo(yPos);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="city-layers-container" ref={containerRef}>
      <div className="city-layers-wrapper" ref={layersRef}>
        {/* Base Layer */}
        <img loading="lazy" decoding="async" src={cityBase}
          className="city-layer base"
          alt="City Base"
        />

        {/* Highlight Layers */}
        <img loading="lazy" decoding="async" src={cityHighlight1}
          className={`city-layer highlight ${activeIndex === 1 ? 'active' : ''}`}
          alt="Highlight 1"
        />
        <img loading="lazy" decoding="async" src={cityHighlight2}
          className={`city-layer highlight ${activeIndex === 2 ? 'active' : ''}`}
          alt="Highlight 2"
        />

        {/* Interactive Dots */}
        <div className="dots-container">
          <div
            className={`position-dot dot-1 ${activeIndex === 1 ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(1)}
            onMouseLeave={() => setActiveIndex(0)}
          >
            <div className="dot-pulse"></div>
            <div className="dot-label">Global HQ</div>
          </div>

          <div
            className={`position-dot dot-2 ${activeIndex === 2 ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(2)}
            onMouseLeave={() => setActiveIndex(0)}
          >
            <div className="dot-pulse"></div>
            <div className="dot-label">Industrial Hub</div>
          </div>
        </div>
      </div>

      <div className="bottom-gradient"></div>
    </div>
  );
};

export default CityLayers;
