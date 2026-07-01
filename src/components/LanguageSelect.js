import React from 'react';
import { motion } from 'framer-motion';
import './LanguageSelect.css';

const panelMotion = (dir) => ({
  initial: { opacity: 0, x: dir === 'left' ? -48 : 48 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
});

export default function LanguageSelect({ onSelect }) {
  return (
    <div className="ls">
      <div className="ls__ambient" aria-hidden="true">
        <div className="ls__orb ls__orb--chrome" />
        <div className="ls__orb ls__orb--blue" />
      </div>
      <div className="ls__grain" aria-hidden="true" />

      <motion.button
        type="button"
        className="ls__panel ls__panel--en"
        onClick={() => onSelect('en')}
        {...panelMotion('left')}
      >
        <span className="ls__panel-code">EN</span>
        <div className="ls__panel-meta">
          <span className="ls__panel-label">English</span>
          <span className="ls__panel-sub">Continue in English</span>
        </div>
        <span className="ls__panel-arrow ls__panel-arrow--en" aria-hidden="true">←</span>
      </motion.button>

      <div className="ls__center">
        <motion.div
          className="ls__card"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ls__logo" aria-hidden="true">
            <span className="ls__logo-mark logo-mark">MR</span>
          </div>

          <div className="ls__name-stack">
            {['MAHERY', 'RAMAHAY'].map((w, i) => (
              <div key={w} className="ls__clip">
                <motion.span
                  className={`ls__name-word${i === 1 ? ' ls__name-word--accent' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                </motion.span>
              </div>
            ))}
          </div>


          <motion.p
            className="ls__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Fullstack Dev · 2026
          </motion.p>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="ls__panel ls__panel--fr"
        onClick={() => onSelect('fr')}
        {...panelMotion('right')}
      >
        <span className="ls__panel-code">FR</span>
        <div className="ls__panel-meta">
          <span className="ls__panel-label">Français</span>
          <span className="ls__panel-sub">Continuer en Français</span>
        </div>
        <span className="ls__panel-arrow ls__panel-arrow--fr" aria-hidden="true">→</span>
      </motion.button>
    </div>
  );
}
