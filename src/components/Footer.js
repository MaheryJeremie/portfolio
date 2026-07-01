import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__mark logo-mark">MR</span>
          <p className="footer__built">{t.footer.built}</p>
        </div>
        <div className="footer__right">
          <a
            href="https://github.com/MaheryJeremie"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
          <span className="footer__sep">·</span>
          <a
            href="https://www.linkedin.com/in/mahery-ramahay-mandimby-823b6b315/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            LinkedIn
          </a>
          <button type="button" className="footer__top" onClick={scrollToTop} aria-label={t.footer.backToTop}>
            ↑
          </button>
        </div>
      </div>
      <p className="footer__copy">
        {t.footer.copy.replace('{year}', new Date().getFullYear())}
      </p>
    </footer>
  );
}
