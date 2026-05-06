import React from 'react';
import { ShieldCheck } from 'lucide-react';
import '../PremiumSections.css';

export const Footer = React.memo(() => (
  <footer className="premium-section footer-flow w-full border-t border-white/[0.08] px-6 pb-12 pt-10 relative z-20 bg-transparent">
    <div className="footer-signal" aria-hidden="true" />
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 font-bold text-white uppercase">
        <ShieldCheck size={18} />
        <span>SHARVEX</span>
      </div>
      <p>Engineering | Product Design | Strategic Growth</p>
      <div className="flex gap-8 uppercase text-xs font-bold">
        <a href="#intro" className="hover:text-white transition-colors duration-300">Intro</a>
        <a href="#services" className="hover:text-white transition-colors duration-300">Services</a>
        <a href="#capital" className="hover:text-white transition-colors duration-300">Contact</a>
      </div>
    </div>
  </footer>
));
