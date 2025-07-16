import React, { useEffect, useRef } from 'react';
import bgVideo from '/assets/bg.mp4';
import logoVideo from '/assets/logo.webm';
import './hero.css';

const Hero = () => {
  const bgVideoRef = useRef(null);
  const logoVideoRef = useRef(null);

  useEffect(() => {
    const playVideos = async () => {
      try {
        await bgVideoRef.current?.play();
        await logoVideoRef.current?.play();
      } catch (error) {
        console.log('Video autoplay failed:', error);
      }
    };
    playVideos();
  }, []);

  return (
    <div className="hero-section" id="hero">
      <div className="video-wrapper">
        <video ref={bgVideoRef} autoPlay muted loop playsInline className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <div className="ieee-logo-block">
            <div className="ieee-line"></div>
            <div>
              <div className="ieee-text-container">
                <span className="ieee-text-main">IEEE</span>
                <video 
                  ref={logoVideoRef}
                  className="ieee-video" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src={logoVideo} type="video/webm" />
                </video>
              </div>
              <div className="ieee-text-sub">STUDENT BRANCH JIIT</div>
            </div>
          </div>

          <h1 className="hero-heading">
            <span className="no-break">Advancing Technology for</span><br />
            <span className="highlight">Humanity</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;