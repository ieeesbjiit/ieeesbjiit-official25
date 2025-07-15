import React, { useState, useEffect } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import Navbar from './components/Navbar';
import About from './components/About';
import Stats from './components/Stats';
import Contact from './components/Contact';
import WIE from './components/WIE';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Teams from './components/Teams';
import ThreeDModel from './components/ThreeDModel';
import CreatorsCTA from './components/CreaterCTA';
import Preloader from './components/Preloader';
import Slider from './components/EventsSlider';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const preloadHero = async () => {
      try {
        const videoPromises = [
          new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.oncanplaythrough = resolve;
            video.onerror = reject;
            video.src = '/assets/bg.mp4';
          }),
          new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.oncanplaythrough = resolve;
            video.onerror = reject;
            video.src = '/assets/logo.webm';
          })
        ];

        await Promise.all(videoPromises);
        setHeroLoaded(true);
      } catch (error) {
        console.log('Some Hero assets failed to load:', error);
        setHeroLoaded(true);
      }
    };

    preloadHero();
  }, []);

  const handlePreloaderFinish = () => {
    if (heroLoaded) {
      setIsLoaded(true);
    } else {
      const checkHero = setInterval(() => {
        if (heroLoaded) {
          clearInterval(checkHero);
          setIsLoaded(true);
        }
      }, 100);
    }
  };

  return (
    <>
      {!isLoaded && <Preloader onFinish={handlePreloaderFinish} />}

      {!isLoaded && (
        <div
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
        >
          <BackgroundWrapper>
            <Hero />
          </BackgroundWrapper>
        </div>
      )}

      {isLoaded && (
        <BackgroundWrapper>
          <div className="App">
            <ThreeDModel />
            <Navbar />

            
             
          <main>
            <section id="HOME" className="section">
              <Hero />
            </section>

            <section id="stats" className="section">
              <Stats />
            </section>

            <section id="GALLERY" className="section">
              <Gallery />
            </section>

            <section id="WIE" className="section">
              <WIE />
            </section>

            <section id="team" className="section">
              <Teams />
            </section>

            <section id="EVENTS" className="section">
              <Slider />
            </section>
          </main>


              


          

            <Footer />
          </div>
        </BackgroundWrapper>
      )}
    </>
  );
}

export default App;
