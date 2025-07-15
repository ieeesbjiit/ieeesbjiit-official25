import React, { useEffect, useRef } from 'react';
import bgVideo from '/assets/bg.mp4';
import logoVideo from '/assets/logo.webm';
import './hero.css';

const Hero = () => {
  const bgVideoRef = useRef(null);
  const logoVideoRef = useRef(null);

  useEffect(() => {
    // Force videos to play immediately when component mounts
    const playVideos = async () => {
      try {
        if (bgVideoRef.current) {
          bgVideoRef.current.currentTime = 0;
          await bgVideoRef.current.play();
        }
        if (logoVideoRef.current) {
          logoVideoRef.current.currentTime = 0;
          await logoVideoRef.current.play();
        }
      } catch (error) {
        console.log('Video autoplay failed:', error);
      }
    };

    playVideos();
  }, []);

  return (
    <div className="hero-section section" id="hero">
      <div className="video-wrapper" id="hero">
        <video 
          ref={bgVideoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          className="bg-video"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="ieee-logo-block">
            <div className="ieee-line animate-fade-in-up delay-300"></div>
            <div>
              <span className="ieee-text-main animate-fade-in-up delay-400">IEEE</span>
              <video 
                ref={logoVideoRef}
                className="ieee-video animate-fade-in delay-500" 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="auto"
              >
                <source src={logoVideo} type="video/webm" />
              </video>
              <div className="ieee-text-sub animate-fade-in-up delay-500">STUDENT BRANCH JIIT</div>
            </div>
          </div>

          <h1 className="hero-heading animate-fade-in-up delay-600">
            <span className="no-break">Advancing Technology for</span><br />
            <span className="highlight">Humanity</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;