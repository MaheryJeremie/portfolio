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

  return (
    <section id="about" className="about">
      <div className="about__num" aria-hidden="true">01</div>

      <div className="about__inner">
        {/* Left */}
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

          {/* Meta */}
          <motion.div
            className="about__meta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {[
              ['Location', t.about.location],
              ['Email', t.about.email],
              ['GitHub', t.about.github],
              ['LinkedIn', t.about.linkedin],
            ].map(([k, v]) => (
              <div className="about__meta-row" key={k}>
                <span className="about__meta-k">{k}</span>
                <span className="about__meta-v">{v}</span>
              </div>
            ))}
            <div className="about__meta-row">
              <span className="about__meta-k">Status</span>
              <span className="about__meta-v about__meta-avail">● {t.hero?.available}</span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="about__stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t.about.stats.map((s) => (
              <div className="about__stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
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

          {/* Interests */}
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

          {/* Languages */}
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
