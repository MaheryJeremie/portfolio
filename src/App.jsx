import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { initScrollReveal } from './utils/scrollReveal';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize scroll reveal animations
    const cleanupScrollReveal = initScrollReveal();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      // Cleanup scroll reveal
      cleanupScrollReveal();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App
