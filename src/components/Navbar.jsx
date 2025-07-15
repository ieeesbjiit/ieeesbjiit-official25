import React, { useEffect, useState } from 'react';
import './Navbar.css';
import IEEE_Logo from '/assets/IEEE_Logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // yeh threshold adjust kar sakta
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <img src={IEEE_Logo} alt="IEEE Logo" className="logo" />
      <nav className="navbar">
        <a href="#HOME">HOME</a>
        <a href="#ABOUT">ABOUT</a>
        <a href="#EVENTS">EVENTS</a>
        <a href="#GALLERY">GALLERY</a>
        <a href="#WIE">WIE</a>
   
      </nav>
    </header>
  );
};

export default Navbar;
