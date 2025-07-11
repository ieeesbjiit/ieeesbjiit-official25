import React, { useEffect, useRef, useState } from "react";
import "./WIE.css";

const phrases = ["Inspire...", "Empower...", "Achieve..."];
const galleryImages = [
  "1.jpg", "3.jpg", "5.png", "6.jpg", "7.jpg", "8.jpg"
];

const WIE = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const typewriterRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sliderRef = useRef(null);
useEffect(() => {
  const currentPhrase = phrases[phraseIndex];
  const fullText = currentPhrase;

  const typingSpeed = isDeleting ? 50 : 100;
  const pauseBeforeDelete = 1000;

  const timeout = setTimeout(() => {
    if (!isDeleting && charIndex < fullText.length) {
      setCharIndex(charIndex + 1);
    } else if (isDeleting && charIndex > 0) {
      setCharIndex(charIndex - 1);
    } else {
      if (!isDeleting) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }
  }, typingSpeed);

  if (typewriterRef.current) {
    typewriterRef.current.textContent = fullText.substring(0, charIndex);
  }

  return () => clearTimeout(timeout);
}, [charIndex, isDeleting, phraseIndex]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const showSlide = (index) => {
    const total = galleryImages.length;
    if (index >= total) index = 0;
    if (index < 0) index = total - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  return (
    <section className="wie-section">
      <div className="wie-heading">
        <img src="/images-wie/wie-logo.png" alt="WIE Logo" className="wie-logo" />
        <div className="wie-text">
          <h1>Women in Engineering</h1>
          <p className="wie-tagline" ref={typewriterRef}></p>
        </div>
      </div>

      <div className="wie-content">
        <div className="wie-left">
          <h2>About WIE</h2>
          <p>
            The Women in Engineering (WIE) Affinity Group at IEEE SB JIIT is dedicated to promoting the involvement
            and success of women in engineering and technology. Through our various initiatives, events, and programs,
            we aim to encourage professional growth, networking, and collaboration among women engineers. By fostering
            a supportive community, WIE at IEEE SB JIIT envisions a future where women and men collaborate to drive
            technological innovation for societal benefit. Provide assistance with the formation of new IEEE WIE
            Affinity Groups and support ongoing activities. Promote member grade advancement for women to the IEEE
            membership grades of Senior Member and Fellow. Advocate women in leadership roles in IEEE governance and
            career advancement for women in the profession.
          </p>
        </div>

        <div className="wie-right">
          <h2>Our Events</h2>
          <div className="gallery-container">
            <div className="slider" ref={sliderRef} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {galleryImages.map((img, index) => (
                <div className="slide" key={index}>
                  <img src={`/images-wie/${img}`} alt={`Event ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="nav prev" onClick={prevSlide}>&#10094;</button>
            <button className="nav next" onClick={nextSlide}>&#10095;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WIE;
