import React, { useRef, useEffect } from 'react';
import '../App.css'; // Ensure this import is present

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hovering');
    };

    document.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
