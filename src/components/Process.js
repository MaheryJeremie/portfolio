import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Process.css';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="process">
      <div className="process__inner">
        <motion.div
          className="process__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="process__eyebrow">{t.process.subtitle}</span>
          <h2 className="process__title">{t.process.title}</h2>
        </motion.div>

        <div className="process__steps">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="process__step"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="process__step-num">{step.num}</span>
              <div className="process__step-body">
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
