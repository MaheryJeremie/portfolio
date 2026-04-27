import React from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageSelect from './components/LanguageSelect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './components/sections.css';

function Portfolio() {
  const { language, selectLanguage } = useLanguage();

  if (!language) {
    return <LanguageSelect onSelect={selectLanguage} />;
  }

  const handleDownloadCV = () => {
    const filename = language === 'fr' ? 'CV_Nala_Rehareha_FR.pdf' : 'CV_Nala_Rehareha_EN.pdf';
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="portfolio">
      <Navbar onDownloadCV={handleDownloadCV} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}

export default App;
