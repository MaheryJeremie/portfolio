import React, { useState } from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
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

function Portfolio() {
  const { language, selectLanguage } = useLanguage();
  const [loaded, setLoaded] = useState(false);

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
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className={`portfolio${loaded ? ' portfolio--ready' : ''}`}>
        <Navbar onDownloadCV={handleDownloadCV} />
        <main>
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
    <LanguageProvider>
      <Cursor />
      <Portfolio />
    </LanguageProvider>
  );
}

export default App;
