import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const { t } = useLanguage();

  const metaItems = [
    { label: t.about.meta.location, value: t.about.location, href: null },
    { label: t.about.meta.email, value: t.about.email, href: `mailto:${t.about.email}` },
    { label: t.about.meta.phone, value: t.about.phone, href: `tel:${t.about.phone.replace(/\s/g, '')}` },
    { label: t.about.meta.github, value: t.about.github, href: `https://${t.about.github}` },
    { label: t.about.meta.linkedin, value: t.about.linkedin, href: `https://${t.about.linkedin}` },
  ];

  return (
    <section id="about" className="about">
      <div className="about__num" aria-hidden="true">01</div>

      <div className="about__inner">
        <div className="about__left">
          <motion.p
            className="about__eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.about.subtitle}
          </motion.p>
          <motion.h2
            className="about__title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.about.title}
          </motion.h2>

          <motion.div
            className="about__meta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {metaItems.map(({ label, value, href }) => (
              <div className="about__meta-row" key={label}>
                <span className="about__meta-k">{label}</span>
                {href ? (
                  <a className="about__meta-v about__meta-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {value}
                  </a>
                ) : (
                  <span className="about__meta-v">{value}</span>
                )}
              </div>
            ))}
            <div className="about__meta-row">
              <span className="about__meta-k">{t.about.meta.status}</span>
              <span className="about__meta-v about__meta-avail">● {t.hero.available}</span>
            </div>
          </motion.div>
        </div>

        <div className="about__right">
          <div className="about__bio">
            {t.about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="about__para"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="about__interests"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <p className="about__tag-label">{t.about.interests.title}</p>
            <div className="about__chips">
              {t.about.interests.items.map((item) => (
                <span key={item} className="about__chip">{item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about__langs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <p className="about__tag-label">{t.about.languages.title}</p>
            <div className="about__langs-row">
              {t.about.languages.items.map((l) => (
                <div key={l.lang} className="about__lang-item">
                  <span className="about__lang-name">{l.lang}</span>
                  <span className="about__lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
