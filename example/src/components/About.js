import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.8, ease: [0.16,1,0.3,1] } }),
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      {/* Number label */}
      <div className="about__num" aria-hidden="true">01</div>

      <div className="about__inner">
        {/* Left: big title */}
        <div className="about__left">
          <motion.h2
            className="about__title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          >
            {t.about.title}
          </motion.h2>

          <motion.div
            className="about__meta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="about__meta-row">
              <span className="about__meta-k">Location</span>
              <span className="about__meta-v">{t.about.location}</span>
            </div>
            <div className="about__meta-row">
              <span className="about__meta-k">Email</span>
              <a href={`mailto:${t.about.email}`} className="about__meta-v about__meta-link">{t.about.email}</a>
            </div>
            <div className="about__meta-row">
              <span className="about__meta-k">GitHub</span>
              <a href="https://github.com/rehareha" target="_blank" rel="noopener noreferrer" className="about__meta-v about__meta-link">github.com/rehareha ↗</a>
            </div>
            <div className="about__meta-row">
              <span className="about__meta-k">Status</span>
              <span className="about__meta-v about__meta-avail">● Available</span>
            </div>
          </motion.div>
        </div>

        {/* Right: bio + interests */}
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
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p className="about__interests-label">Interests</p>
            <div className="about__interests-row">
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
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <p className="about__interests-label">Languages</p>
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
