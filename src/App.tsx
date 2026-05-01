import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import Chatbot from './components/Chatbot';
import PremiumSections, { FollowingPointer } from './components/PremiumSections';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

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
