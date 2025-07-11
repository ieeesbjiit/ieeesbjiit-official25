let currentIndex = 0;
const slides = document.querySelector(".slider");
setInterval(() => nextSlide(), 3000); 
function showSlide(index) {
  const totalSlides = slides.children.length;
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;
  currentIndex = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}



const phrases = ["Inspire...", "Empower...", "Achieve..."];
const typewriter = document.getElementById("typewriter");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const visibleText = currentPhrase.substring(0, charIndex);

  typewriter.textContent = visibleText;

  if (!isDeleting && charIndex < currentPhrase.length) {
    // Typing forward
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    // Deleting backward
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    
    isDeleting = !isDeleting;

    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, 1000); 
  }
}

window.addEventListener("DOMContentLoaded", typeEffect);



