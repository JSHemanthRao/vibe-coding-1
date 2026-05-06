import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';
import { assetManager } from '../../utils/AssetManager';
import { images } from '../../constants';
import logo from '../../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Preload critical background assets
        await Promise.all([
          assetManager.preloadImage(images.darkCity),
          assetManager.preloadImage(images.blackAbstract),
        ]);
      } catch (err) {
        console.warn("Asset preloading failed", err);
      } finally {
        startAnimation();
      }
    };

    const startAnimation = () => {
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
          delay: 0.5, // Reduced delay since we actually waited for assets
          ease: "power3.inOut"
        })
        .to(preloaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power4.inOut"
        });
      }, preloaderRef);

      return ctx;
    };

    const animationCtx = loadAssets();
    
    return () => {
      // Revert GSAP if it was started
      // Note: loadAssets is async, so we need to handle the context carefully
    };
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
