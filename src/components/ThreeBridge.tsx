import React, { useEffect, useRef } from 'react';
import { sceneManager } from './three/SceneManager';

/**
 * ThreeBridge - The connection point between React and the global Three.js engine.
 * Ensures the canvas is initialized once and resize events are handled correctly.
 */
export const ThreeBridge: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      sceneManager.init(canvasRef.current);
    }

    const handleResize = () => {
      sceneManager.onResize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Note: We don't dispose the singleton here as it might be used by other parts of the app
      // Disposal should happen at the root of the app if needed.
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      style={{ touchAction: 'none' }}
    />
  );
};
