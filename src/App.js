import React, { useState } from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Analytics from './components/Analytics';
import LanguageSelect from './components/LanguageSelect';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Process from './components/Process';
import CTA from './components/CTA';
import Footer from './components/Footer';

const LOADER_KEY = 'portfolio-loaded';

function Portfolio() {
  const { language, selectLanguage, t } = useLanguage();
  const [loaded, setLoaded] = useState(
    () => sessionStorage.getItem(LOADER_KEY) === '1'
  );

  const handleDownloadCV = () => {
    const filename = language === 'fr' ? 'CV_Mahery_FR.pdf' : 'CV_Mahery_EN.pdf';
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/${filename}`;
    link.download = filename;
    link.click();
  };

  const handleLoaderComplete = () => {
    sessionStorage.setItem(LOADER_KEY, '1');
    setLoaded(true);
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
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <div className={`portfolio${loaded ? ' portfolio--ready' : ''}`}>
        <Navbar onDownloadCV={handleDownloadCV} />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Process />
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
        <Cursor />
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
