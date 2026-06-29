import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm, { isContactFormEnabled } from './ContactForm';
import './CTA.css';

function MailIcon() {
  return (
    <svg className="cta__btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 5.5A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m3.5 6 6.2 4.3a1.5 1.5 0 0 0 1.6 0L17.5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CTA({ onDownloadCV }) {
  const { t, language } = useLanguage();
  const [line1, line2] = t.cta.title.split('\n');
  const showForm = isContactFormEnabled();

  const mailtoHref = `mailto:${t.cta.email}?subject=${encodeURIComponent(
    language === 'fr' ? 'Contact portfolio — Mahery' : 'Portfolio contact — Mahery'
  )}`;

  return (
    <section id="contact" className="cta">
      <div className="cta__orb cta__orb--purple" aria-hidden="true" />
      <div className="cta__orb cta__orb--cyan" aria-hidden="true" />

      <div className="cta__inner">
        <motion.div
          className="cta__title-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="cta__title">
            <span className="cta__title-line">{line1}</span>
            <span className="cta__title-line cta__title-line--accent">{line2}</span>
          </h2>
        </motion.div>

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
          <button type="button" className="cta__btn cta__btn--primary" onClick={onDownloadCV}>
            {t.cta.btnCV}
          </button>
          <a
            href={mailtoHref}
            className="cta__btn cta__btn--email"
            aria-label={t.cta.emailAria}
          >
            <MailIcon />
            <span>{t.cta.email}</span>
          </a>
        </motion.div>

        {showForm && <ContactForm />}
      </div>
    </section>
  );
}
