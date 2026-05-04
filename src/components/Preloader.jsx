import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';
import logo from '../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      )
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 1,
        delay: 1,
        ease: "power3.inOut"
      })
      .to(preloaderRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
      });
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-content">
        <img src={logo} alt="SHARVEX Logo" className="preloader-logo" ref={logoRef} />
      </div>
    </div>
  );
};

export default Preloader;
