// import { useEffect, useRef } from 'react';
// import './Cursor.css';

// const Cursor = () => {
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     const move = (e) => {
//       requestAnimationFrame(() => {
//         if (cursorRef.current) {
//           cursorRef.current.style.left = e.clientX + 'px';
//           cursorRef.current.style.top = e.clientY + 'px';
//         }
//       });
//     };
//     window.addEventListener('mousemove', move);
//     return () => window.removeEventListener('mousemove', move);
//   }, []);

//   return (
//     <div className="custom-cursor" ref={cursorRef}>
//       <div className="nucleus"></div>
//       <div className="orbit orbit1"><div className="electron"></div></div>
//       <div className="orbit orbit2"><div className="electron"></div></div>
//       <div className="orbit orbit3"><div className="electron"></div></div>
//     </div>
//   );
// };

// export default Cursor;
