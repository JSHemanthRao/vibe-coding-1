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
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !layersRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * 40;

      gsap.to(layersRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="city-layers-container" ref={containerRef}>
      <div className="city-layers-wrapper" ref={layersRef}>
        {/* Base Layer */}
        <img 
          src={cityBase} 
          className="city-layer base" 
          alt="City Base" 
        />
        
        {/* Highlight Layers */}
        <img 
          src={cityHighlight1} 
          className={`city-layer highlight ${activeIndex === 1 ? 'active' : ''}`} 
          alt="Highlight 1" 
        />
        <img 
          src={cityHighlight2} 
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
