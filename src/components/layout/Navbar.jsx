import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import './Navbar.css';
import logo from '../../assets/logo.png';

const navItems = [
  { label: 'Intro', href: '#intro' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Capital', href: '#capital' }
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = lastYRef.current;
    const shouldBeVisible = latest < 80 || latest < previous;
    if (visible !== shouldBeVisible) {
      setVisible(shouldBeVisible);
    }
    lastYRef.current = latest;
  });

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: visible ? 0 : -96, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <img loading="lazy" decoding="async" src={logo} alt="SHARVEX" className="nav-logo-img" />
          <span>SHARVEX</span>
        </div>
        
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a className="nav-btn-primary" href="#capital">Start a Dialogue</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
