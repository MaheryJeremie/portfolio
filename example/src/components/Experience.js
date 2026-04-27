import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Experience.css';

export default function Experience() {
  const { t } = useLanguage();
  const [activeJob, setActiveJob] = useState(0);

  const job = t.experience.jobs[activeJob];

  return (
    <section id="experience" className="experience">
      <div className="experience__num" aria-hidden="true">03</div>
      <div className="experience__inner">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="experience__eyebrow">{t.experience.subtitle}</span>
          <h2 className="experience__title">{t.experience.title}</h2>
        </motion.div>

        <div className="experience__layout">
          {/* Sidebar */}
          <div className="experience__sidebar">
            {t.experience.jobs.map((j, i) => (
              <button
                key={i}
                className={`experience__tab ${activeJob === i ? 'experience__tab--active' : ''}`}
                onClick={() => setActiveJob(i)}
              >
                <span className="experience__tab-role">{j.role}</span>
                <span className="experience__tab-company">{j.company}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJob}
              className="experience__content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="experience__header">
                <h3 className="experience__role">
                  {job.role}
                  <span className="experience__company"> @ {job.company}</span>
                </h3>
                <p className="experience__period">{job.period}</p>
              </div>

              <div className="experience__tech">
                {job.tech.map((t) => (
                  <span key={t} className="experience__tech-tag">{t}</span>
                ))}
              </div>

              <ul className="experience__bullets">
                {job.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    className="experience__bullet"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="experience__bullet-dot" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
