import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SkillsScene from './three/SkillsScene';
import './Skills.css';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="skills">
      <div className="skills__num" aria-hidden="true">02</div>
      <div className="skills__inner">
        {/* Top: title + 3D */}
        <div className="skills__top">
          <motion.div
            className="skills__header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            <span className="skills__eyebrow">Technical Stack</span>
            <h2 className="skills__title">{t.skills.title}</h2>
          </motion.div>

          <motion.div
            className="skills__canvas-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <Suspense fallback={<div className="skills__canvas-fallback" />}>
              <SkillsScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Skills grid */}
        <div className="skills__cats">
          {t.skills.categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              className="skills__cat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.7 }}
            >
              <p className="skills__cat-label">{cat.label}</p>
              <div className="skills__tags">
                {cat.items.map((item) => (
                  <span key={item} className="skills__tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
