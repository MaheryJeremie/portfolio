import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const SECTIONS = [
  'about',
  'projects',
  'skills',
  'experience',
  'education',
  'process',
  'contact',
];

export default function Navbar({ onDownloadCV }) {
  const { t, language, selectLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const { scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const toggleLang = () => selectLanguage(language === 'en' ? 'fr' : 'en');

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      <div
        className="nav__progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <div className="nav__inner">
        <a href="#hero" className="nav__logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="nav__logo-mark logo-mark">MR</span>
          <span className="nav__logo-name"></span>
        </a>

        <ul
          className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}
          id="nav-menu"
        >
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={`nav__link${activeSection === s ? ' nav__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(s); }}
                aria-current={activeSection === s ? 'true' : undefined}
              >
                {t.nav[s]}
              </a>
            </li>
          ))}
          <li className="nav__mobile-actions">
            <button type="button" className="nav__theme" onClick={toggleTheme}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button type="button" className="nav__lang" onClick={toggleLang}>
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button type="button" className="nav__cv btn-glow" onClick={onDownloadCV}>
              {t.nav.downloadCV}
            </button>
          </li>
        </ul>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme nav__theme--desktop"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button type="button" className="nav__lang nav__lang--desktop" onClick={toggleLang}>
            {language === 'en' ? 'FR' : 'EN'}
          </button>
          <button type="button" className="nav__cv nav__cv--desktop btn-glow" onClick={onDownloadCV}>
            {t.nav.downloadCV}
          </button>
          <button
            type="button"
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
