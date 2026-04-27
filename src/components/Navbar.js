import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

export default function Navbar({ onDownloadCV }) {
  const { t, language, selectLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const sections = ['about', 'projects', 'skills', 'education', 'experience', 'process'];

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => scrollTo('hero')}>
          <span className="nav__logo-mark">MR</span>
          <span className="nav__logo-name">Mahery</span>
        </button>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {sections.map((s) => (
            <li key={s}>
              <button className="nav__link" onClick={() => scrollTo(s)}>
                {t.nav[s]}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <button
            className="nav__lang"
            onClick={() => selectLanguage(language === 'en' ? 'fr' : 'en')}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
          <button className="nav__cv" onClick={onDownloadCV}>
            {t.nav.downloadCV}
          </button>
          <button
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
