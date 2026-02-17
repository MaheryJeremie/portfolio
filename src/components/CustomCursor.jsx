import React, { useEffect, useState, useRef, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './CustomCursor.css';

const CustomCursor = () => {
  const { theme } = useContext(ThemeContext);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Main cursor follows with a delay
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;

      // Dot follows immediately
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
    };

    // Check if hovering over clickable elements
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('theme-toggle') ||
        target.classList.contains('mobile-menu-toggle') ||
        target.classList.contains('pill') ||
        target.classList.contains('tag')
      ) {
        setIsPointer(true);
      }
    };

    const onMouseOut = () => {
      setIsPointer(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${theme} ${isPointer ? 'pointer' : ''}`}
      ></div>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${theme} ${isPointer ? 'pointer' : ''}`}
      ></div>
    </>
  );
};

export default CustomCursor;
