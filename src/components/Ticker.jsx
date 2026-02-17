import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Ticker.css';

const Ticker = () => {
  const tickerRef = useRef(null);
  
  useEffect(() => {
    if (!tickerRef.current) return;
    
    const skills = [
      'Java', 'Spring Boot', 'Python', 'PHP', 'JavaScript', 'C', 'C#', 'C++',
      'Symfony', 'Vue.js', 'AngularJS', 'React Native', 'Node.js', 'Odoo', 'Frappe', '.NET', 'Bootstrap',
      'PostgreSQL', 'MySQL', 'MongoDB', 'Oracle', 'GitHub', 'Docker', 'Firebase'
    ];
    
    // Create ticker items
    const tickerContent = skills.map(skill => `<div class="ticker-item">${skill}</div>`).join('');
    const duplicatedContent = tickerContent + tickerContent; // Duplicate for seamless loop
    
    if (tickerRef.current) {
      tickerRef.current.innerHTML = duplicatedContent;
    }
    
    // Animate ticker
    const tickerWidth = tickerRef.current.offsetWidth;
    const itemWidth = tickerWidth / skills.length;
    
    gsap.to(tickerRef.current, {
      x: -itemWidth * skills.length,
      duration: skills.length * 2,
      ease: 'linear',
      repeat: -1,
    });
    
    return () => {
      gsap.killTweensOf(tickerRef.current);
    };
  }, []);
  
  return (
    <div className="ticker-wrap">
      <div className="ticker" ref={tickerRef} id="ticker-inner"></div>
    </div>
  );
};

export default Ticker;