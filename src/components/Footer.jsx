import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <footer>
      <p>© <span id="year">2026</span> — Mahery Ramahay Mandimby</p>
      <p>Antananarivo, Madagascar</p>
    </footer>
  );
};

export default Footer;