import { useEffect, useRef } from 'react';
import './AtomCursor.css';

const AtomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="atom-cursor" ref={cursorRef}>
      <svg
        viewBox="0 0 200 200"
        className="atom-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* React-style rings */}
        <g stroke="#61DAFB" strokeWidth="2" fill="none">
          <ellipse cx="100" cy="100" rx="80" ry="30" />
          <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)" />
        </g>

        {/* Orbits for electrons (hidden path elements) */}
        <defs>
          <path
            id="orbit1"
            d="M20,100a80,30 0 1,0 160,0a80,30 0 1,0 -160,0"
            fill="none"
          />
          <path
            id="orbit2"
            d="M20,100a80,30 0 1,0 160,0a80,30 0 1,0 -160,0"
            fill="none"
            transform="rotate(60 100 100)"
          />
          <path
            id="orbit3"
            d="M20,100a80,30 0 1,0 160,0a80,30 0 1,0 -160,0"
            fill="none"
            transform="rotate(120 100 100)"
          />
        </defs>

        {/* Electron on orbit 1 (0° ring) */}
        <circle r="5" fill="#00bfff">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbit1" />
          </animateMotion>
        </circle>

        {/* Electron on orbit 2 (60° ring) */}
        <circle r="5" fill="#00bfff">
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbit2" />
          </animateMotion>
        </circle>

        {/* Electron on orbit 3 (120° ring) */}
        <circle r="5" fill="#00bfff">
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbit3" />
          </animateMotion>
        </circle>

        {/* Nucleus */}
        <circle cx="100" cy="100" r="10" fill="crimson" />
      </svg>
    </div>
  );
};

export default AtomCursor;
