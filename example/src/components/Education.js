import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Education.css';

// Premium SVG icons keyed by icon field
const EDU_ICONS = {
  grad: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
      <path d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5"/>
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
};

function getIcon(iconField) {
  if (iconField === '📚') return EDU_ICONS.book;
  return EDU_ICONS.grad;
}

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="education">
      <div className="education__num" aria-hidden="true">04</div>
      <div className="education__inner">
        <motion.div
          className="education__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="education__eyebrow">{t.education.subtitle}</span>
          <h2 className="education__title">{t.education.title}</h2>
        </motion.div>

        <div className="education__grid">
          {t.education.items.map((item, i) => (
            <motion.div
              key={i}
              className="edu-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className="edu-card__icon">{getIcon(item.icon)}</div>
              <p className="education__period">{item.period}</p>
              <h3 className="education__degree">{item.degree}</h3>
              <p className="education__school">{item.school}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
