import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Experience.css';

export default function Experience() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const job = t.experience.jobs[active];

  return (
    <section id="experience" className="exp section--dense">
      <div className="exp__num" aria-hidden="true">04</div>
      <div className="exp__inner">

        <motion.div
          className="exp__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="exp__eyebrow">{t.experience.subtitle}</span>
          <h2 className="exp__title">{t.experience.title}</h2>
        </motion.div>

        <div className="exp__layout">

          {/* ── Sidebar tabs ── */}
          <div className="exp__tabs">
            {t.experience.jobs.map((j, i) => (
              <button
                key={i}
                className={`exp__tab${active === i ? ' exp__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp__tab-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="exp__tab-info">
                  <span className="exp__tab-role">{j.role}</span>
                  <span className="exp__tab-company">{j.company}</span>
                </span>
                <span className="exp__tab-type">{j.type}</span>
              </button>
            ))}
          </div>

          {/* ── Content panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="exp__panel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="exp__panel-top">
                <div className="exp__panel-meta">
                  <h3 className="exp__role">
                    {job.role}
                    <span className="exp__company"> @ {job.company}</span>
                  </h3>
                  <div className="exp__badges">
                    <span className="exp__badge">{job.period}</span>
                    <span className="exp__badge exp__badge--dim">{job.location}</span>
                  </div>
                </div>

                <div className="exp__tech">
                  {job.tech.map((tag) => (
                    <span key={tag} className="exp__tech-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <ul className="exp__bullets">
                {job.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    className="exp__bullet"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="exp__bullet-dot" aria-hidden="true" />
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
