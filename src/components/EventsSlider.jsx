import React, { useState, useEffect, useRef } from 'react';
import './EventsSlider.css';

const EventsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const autoSlideRef = useRef(null);
  const eventsRef = useRef(null);

  const images = [
    {
      mainImg: "/big-data-7644533_1280.jpg",
      hoverImg: "/278973277_5040470592655073_248035920281809986_n.jpg",
      title: "IEEE Day",
      content: "Celebrating technology innovation",
      link: "https://www.instagram.com/p/DApr7u2hmup/?igsh=MWcwYnd5YTN2bmx6dQ=="
    },
    {
      mainImg: "/big-data-7644538_1280.jpg",
      hoverImg: "/WhatsApp Image 2025-07-08 at 17.19.06_2ade0cac.jpg",
      title: "Tech Blocks",
      content: "Building the future together",
      link: "https://www.instagram.com/p/C_27IinBBIE/?igsh=MTRkdGh5NWV3MnQ1eg=="
    },
    {
      mainImg: "/big-data-7644543_1280.jpg",
      hoverImg: "/WhatsApp Image 2025-07-08 at 17.18.30_71910d64.jpg",
      title: "Xenith",
      content: "Our flagship event",
      link: "https://www.instagram.com/p/DE-AsaBSN1C/?igsh=bmQzcWk5dDRibXl4"
    },
    {
      mainImg: "/technology-8280863_1280.jpg",
      hoverImg: "/Untitled23_20250712095144.png",
      title: "Quizzes",
      content: "Test your knowledge",
      link: "https://www.instagram.com/ieeesbjiit?igsh=MWdyeHQyNDd3OWw5eg=="
    },
    {
      mainImg: "/technology-7111757_1280.jpg",
      hoverImg: "/WhatsApp Image 2025-07-08 at 17.20.15_a95c6bdd.jpg",
      title: "Webinars",
      content: "Learn from experts",
      link: "https://instagram.com/ieeesbjiit/p/DLgzqvVx8JC/"
    },
    {
      mainImg: "/technology-8280863_1280.jpg",
      hoverImg: "/WhatsApp Image 2025-07-08 at 17.19.57_556e6020.jpg",
      title: "Workshops",
      content: "Hands-on learning",
      link: "https://www.instagram.com/ieeesbjiit?igsh=MWdyeHQyNDd3OWw5eg=="
    }
  ];

  const getPositionClass = (index) => {
    const position = (index - currentIndex + images.length) % images.length;
    switch (position) {
      case 0: return 'event-img1';
      case 1: return 'event-img2';
      case 2: return 'event-img3';
      case 3: return 'event-img4';
      case 4: return 'event-img5';
      case 5: return 'event-img6';
      default: return 'event-img6';
    }
  };

  const moveLeft = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    resetAutoSlide();
  };

  const moveRight = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    resetAutoSlide();
  };

  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(moveRight, 3000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    startAutoSlide();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const handleImageClick = (e, index) => {
    if (index !== currentIndex) {
      if (index < currentIndex || (index === images.length - 1 && currentIndex === 0)) {
        moveLeft();
      } else {
        moveRight();
      }
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  return (
    <div className="events" ref={eventsRef}>
      <div className="events-heading">
        <video src="/assets/141810-778906762_small.mp4" autoPlay loop muted />
        <h1 className="events-title">EVENTS</h1>
      </div>

      <div className="events-container">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            className={`event-img-container ${getPositionClass(index)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleImageClick(e, index)}
          >
            <img src={image.mainImg} alt={`Event ${index + 1}`} className="event-main-img" />
            <img src={image.hoverImg} alt={`Event ${index + 1} Hover`} className="event-hover-img" />
            <div className="event-text">
              <p>{image.title}</p>
              {image.content && <p className="event-content">{image.content}</p>}
            </div>
          </a>
        ))}
      </div>

      <div className="event-btns">
        <button className="event-btn" id="left" onClick={moveLeft}>&#10094;</button>
        <button className="event-btn" id="right" onClick={moveRight}>&#10095;</button>
      </div>

      <div className="event-dots">
        <ul>
          {images.map((_, index) => (
            <li
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => handleDotClick(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsSlider;
