import React, { useEffect, useRef } from "react";
import "./Gallery.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Gallery = () => {
  const slideRef = useRef(null);
  const containerRef = useRef(null);
  const lidRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (containerRef.current) {
              containerRef.current.style.display = "block";
            }

            if (lidRef.current) {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  lidRef.current.style.animation = "openLid 2s ease-out forwards";
                }, 200); // to change the lid opening delay
              });
            }            

            updatePositions();

            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    const target = document.querySelector(".gallery-wrapper");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const goNext = () => {
    const slide = slideRef.current;
    const items = slide.querySelectorAll(".item");
    slide.appendChild(items[0]);
    updatePositions();
  };

  const goPrev = () => {
    const slide = slideRef.current;
    const items = slide.querySelectorAll(".item");
    slide.prepend(items[items.length - 1]);
    updatePositions();
  };

  const updatePositions = () => {
    const items = slideRef.current.querySelectorAll(".item");
    items.forEach((item) => item.classList.remove("active"));
    items[0]?.classList.add("active");
  };

  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">Gallery</h2>

      <div className="gallery-macbook">
        <div className="gallery-lid" ref={lidRef}>
          <div className="gallery-frame">
            <div className="gallery-screen">
              <div className="gallery-notch"></div>
              <div className="gallery-display">
                <div
                  className="gallery-container"
                  id="carousel-container"
                  ref={containerRef}
                  style={{ display: "none" }}
                >
                  <div className="gallery-slide" ref={slideRef}>
                    <div className="item" style={{ backgroundImage: "url('/1.jpg')" }}></div>
                    <div className="item" style={{ backgroundImage: "url('/2.jpg')" }}></div>
                    <div className="item" style={{ backgroundImage: "url('/3.JPG')" }}></div>
                    <div className="item" style={{ backgroundImage: "url('/4.jpg')" }}></div>
                    <div className="item" style={{ backgroundImage: "url('/5.jpg')" }}></div>
                    <div className="item" style={{ backgroundImage: "url('/6.jpg')" }}></div>
                  </div>
                  <div className="gallery-button">
                    <button className="prev" onClick={goPrev}>
                      <FaArrowLeft />
                    </button>
                    <button className="next" onClick={goNext}>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery-base"></div>
      </div>
    </div>
  );
};

export default Gallery;