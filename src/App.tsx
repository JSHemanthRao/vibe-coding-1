import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Chatbot from './components/Chatbot';
import PremiumSections from './components/PremiumSections';
import { FollowingPointer } from './components/FollowingPointer';
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
