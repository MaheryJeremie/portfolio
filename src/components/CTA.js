import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './CTA.css';

export default function CTA({ onDownloadCV }) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="cta">
      {/* Orbs */}
      <div className="cta__orb cta__orb--purple" aria-hidden="true" />
      <div className="cta__orb cta__orb--cyan" aria-hidden="true" />

      <div className="cta__inner">
        <motion.h2
          className="cta__title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.cta.title.split('\n').map((line, i) => (
            <span key={i} className="cta__title-line">
              {i === 1 ? <em>{line}</em> : line}
            </span>
          ))}
        </motion.h2>

        <motion.p
          className="cta__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {t.cta.subtitle}
        </motion.p>

        <motion.div
          className="cta__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <button className="cta__btn cta__btn--primary" onClick={onDownloadCV}>
            {t.cta.btnCV}
          </button>
          <a
            href={`mailto:${t.cta.email}`}
            className="cta__btn cta__btn--outline"
          >
            {t.cta.btnContact}
          </a>
        </motion.div>

        <motion.p
          className="cta__email"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a href={`mailto:${t.cta.email}`}>{t.cta.email}</a>
        </motion.p>
      </div>
    </section>
  );
}
