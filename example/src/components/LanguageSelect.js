import React from 'react';
import { motion } from 'framer-motion';
import './LanguageSelect.css';

export default function LanguageSelect({ onSelect }) {
  return (
    <motion.div
      className="lang-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lang-select__ghost" aria-hidden="true">NR</div>

      <div className="lang-select__content">
        <motion.div
          className="lang-select__mark"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          NR
        </motion.div>

        <motion.h1
          className="lang-select__name"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="lang-select__name-line">Nala</span>
          <span className="lang-select__name-line lang-select__name-indent">Reha<em>reha</em></span>
        </motion.h1>

        <motion.p
          className="lang-select__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          Fullstack Dev &nbsp;&middot;&nbsp; AI Engineer
        </motion.p>

        <motion.div
          className="lang-select__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="lang-btn" onClick={() => onSelect('en')}>
            <span className="lang-btn__code">EN</span>
            <span className="lang-btn__label">English</span>
            <span className="lang-btn__sub">Continue in English</span>
          </button>

          <div className="lang-select__sep" aria-hidden="true" />

          <button className="lang-btn" onClick={() => onSelect('fr')}>
            <span className="lang-btn__code">FR</span>
            <span className="lang-btn__label">Fran&#231;ais</span>
            <span className="lang-btn__sub">Continuer en Fran&#231;ais</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
