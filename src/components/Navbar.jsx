import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import IEEE_Logo from '/assets/IEEE_Logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#HOME" className="logo-link">
          <img src={IEEE_Logo} alt="IEEE Logo" className="logo" />
        </a>

        {/* Desktop nav */}
        <nav className="nav-links desktop-only">
          <a href="#HOME">Home</a>
          <a href="#about">About</a>
          <a href="#EVENTS">Events</a>
          <a href="#WIE">WIE</a>
          <a href="#team">Team</a>
          <a href="#GALLERY">Gallery</a>
          <a href="#Footer">Contact Us</a>
          
        </nav>

        {/* Hamburger */}
        <div className="hamburger-icon mobile-only" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Animated Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <a href="#HOME" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#EVENTS" onClick={closeMenu}>Events</a>
            <a href="#WIE" onClick={closeMenu}>WIE</a>
            <a href="#team" onClick={closeMenu}>Team</a>
            <a href="#GALLERY" onClick={closeMenu}>Gallery</a>
            <a href="#Footer" onClick={closeMenu}>Contact Us</a>
            
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;