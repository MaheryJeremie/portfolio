import React from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Analytics from './components/Analytics';
import LanguageSelect from './components/LanguageSelect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import CTA from './components/CTA';
import Footer from './components/Footer';

function Portfolio() {
  const { language, selectLanguage, t } = useLanguage();

  const handleDownloadCV = () => {
    const filename = language === 'fr' ? 'CV_Mahery_FR.pdf' : 'CV_Mahery_EN.pdf';
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/${filename}`;
    link.download = filename;
    link.click();
  };

  if (!language) {
    return <LanguageSelect onSelect={selectLanguage} />;
  }

  return (
    <>
      <Analytics />
      <a href="#main-content" className="skip-link">
        {t.skipLink}
      </a>
      <div className="portfolio">
        <Navbar onDownloadCV={handleDownloadCV} />
        <main id="main-content">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <About />
          <Education />
          <CTA onDownloadCV={handleDownloadCV} />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
