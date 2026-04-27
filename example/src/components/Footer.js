import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <span className="footer__initials">NR</span>
          <span className="footer__name">Nala Rehareha</span>
        </div>
        <p className="footer__made">{t.footer.madeWith}</p>
        <p className="footer__rights">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
