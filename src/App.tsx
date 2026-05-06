import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './components/layout/Navbar';
import Preloader from './components/layout/Preloader';
import Hero from './components/layout/Hero';
import Chatbot from './components/layout/Chatbot';
import PremiumSections from './components/layout/SectionOrchestrator';
import { FollowingPointer } from './components/layout/FollowingPointer';
import { ThreeBridge } from './components/ThreeBridge';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Globally limit all GSAP animations to 60 FPS
    gsap.ticker.fps(60);
  }, []);

  return (
    <div className="app-container">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <ThreeBridge />
      <FollowingPointer />
      <Navbar />
      <Chatbot />
      <main>
        <Hero />
        <PremiumSections />
      </main>
    </div>
  );
}

export default App;
