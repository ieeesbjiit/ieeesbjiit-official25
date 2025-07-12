import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';
import IEEEday from '../src/assets/big-data-7644533_1280.jpg';
import IEEEdayH from '../src/assets/278973277_5040470592655073_248035920281809986_n.jpg';
import Techblocks from '../src/assets/big-data-7644538_1280.jpg';
import Techblocksh from '../src/assets/WhatsApp Image 2025-07-08 at 17.19.06_2ade0cac.jpg';
import xenith from '../src/assets/big-data-7644543_1280.jpg';
import xenithH from '../src/assets/WhatsApp Image 2025-07-08 at 17.18.30_71910d64.jpg';
import Quizzes from '../src/assets/technology-8280863_1280.jpg';
import Quizzesh from '../src/assets/Untitled23_20250712095144.png';
import webinar from '../src/assets/technology-7111757_1280.jpg';
import webinarh from '../src/assets/WhatsApp Image 2025-07-08 at 17.20.15_a95c6bdd.jpg';
import workshop from '../src/assets/technology-8280863_1280.jpg';
import workshoph from '../src/assets/WhatsApp Image 2025-07-08 at 17.19.57_556e6020.jpg';
import video from '../src/assets/141810-778906762_small.mp4';



const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const autoSlideRef = useRef(null);
  const galleryRef = useRef(null);

  const images = [
    {
      mainImg: `${webinar}`,
      hoverImg: `${IEEEdayH}`,
      title: "IEEE Day",
      content: "Celebrating technology innovation",
      link: "https://www.instagram.com/ieeesbjiit?igsh=MWdyeHQyNDd3OWw5eg=="
    },
    {
      mainImg: `${webinar}`,
      hoverImg: `${Techblocksh}`,
      title: "Tech Blocks",
      content: "Building the future together",
      link: "https://www.instagram.com/p/C_27IinBBIE/?igsh=MTRkdGh5NWV3MnQ1eg=="
    },
    {
      mainImg: `${webinar}`,
      hoverImg: `${xenithH}`,
      title: "Xenith",
      content: "Our flagship event",
      link: "https://www.instagram.com/p/DE-AsaBSN1C/?igsh=bmQzcWk5dDRibXl4"
    },
    {
      mainImg: `${webinar}`,
      hoverImg: `${Quizzesh}`,
      title: "Quizzes",
      content: "Test your knowledge",
      link: "https://www.instagram.com/ieeesbjiit?igsh=MWdyeHQyNDd3OWw5eg=="
    },
    {
      mainImg: `${webinar}`,
      hoverImg: `${webinarh}`,
      title: "Webinars",
      content: "Learn from experts",
      link: "https://instagram.com/ieeesbjiit/p/DLgzqvVx8JC/"
    },
    {
      mainImg:`${webinar}`,
      hoverImg: `${workshoph}`,
      title: "Workshops",
      content: "Hands-on learning",
      link: "https://www.instagram.com/ieeesbjiit?igsh=MWdyeHQyNDd3OWw5eg=="
    }
  ];

  const getPositionClass = (index) => {
    const position = (index - currentIndex + images.length) % images.length;
    
    switch(position) {
      case 0: return 'img1';
      case 1: return 'img2';
      case 2: return 'img3';
      case 3: return 'img4';
      case 4: return 'img5';
      case 5: return 'img6';
      default: return 'img6';
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
    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, []);

  return (
    <div className="gallery" ref={galleryRef}>
      <div className="heading">
        <video src={video} autoPlay loop muted></video>
        <h1 className="title">EVENTS</h1>
      </div>

      <div className="gallery-container">
        {images.map((image, index) => (
          <a 
            key={index}
            href={image.link}
            className={`img-container ${getPositionClass(index)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleImageClick(e, index)}
          >
            <img src={image.mainImg} alt={`Event ${index + 1}`} className="main-img" />
            <img src={image.hoverImg} alt={`Event ${index + 1} Hover`} className="hover-img" />
            <div className="image-text">
              <p>{image.title}</p>
              {image.content && <p className="content">{image.content}</p>}
            </div>
          </a>
        ))}
      </div>

      <div className="btns">
        <button className="btn" id="left" onClick={moveLeft}>&#10094;</button>
        <button className="btn" id="right" onClick={moveRight}>&#10095;</button>
      </div>

      <div className="dots">
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

export default Slider;