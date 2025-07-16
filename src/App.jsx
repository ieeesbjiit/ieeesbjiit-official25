import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/about';
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
import AtomCursor from './components/AtomCursor';
import Backgroundwrapper from './components/BackgroundWrapper';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderFinish = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <Preloader onFinish={handlePreloaderFinish} />}

      {isLoaded && (
        <Backgroundwrapper >
        <div className="App">
          
          <ThreeDModel />
          {/* <AtomCursor /> */}
          <Navbar />

          <main>
            <section id="HOME" className="section">
              <Hero />
            </section>
            
            <section id="stats" className="section">
              <Stats />
            </section>

            <section id="About" className="section">
              <About />
            </section>


            
            <section id="EVENTS" className="section">
              <Slider />
            </section>

            <section id="WIE" className="section">
              <WIE />
            </section>

            <section id="team" className="section">
              <Teams />
            </section>

            <section id="GALLERY" className="section">
              <Gallery />
            </section>
          </main>
          <section id="Footer">
          <Footer />
          </section>
        </div>
        </Backgroundwrapper>
      )}
    </>
  );
}

export default App;
