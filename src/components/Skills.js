import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Skills.css';

export default function Skills() {
  const { t } = useLanguage();
  const [active, setActive] = useState(t.skills.categories[0].key);
  const category = t.skills.categories.find((c) => c.key === active);

  return (
    <section id="skills" className="skills">
      <div className="skills__num" aria-hidden="true">03</div>

      <div className="skills__inner">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="skills__eyebrow">{t.skills.subtitle}</span>
          <h2 className="skills__title">{t.skills.title}</h2>
        </motion.div>

        <div className="skills__body">
          {/* Tabs */}
          <motion.div
            className="skills__tabs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.skills.categories.map((cat) => (
              <button
                key={cat.key}
                className={`skills__tab ${active === cat.key ? 'skills__tab--active' : ''}`}
                onClick={() => setActive(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Items */}
          <motion.div
            key={active}
            className="skills__items"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {category.items.map((item, i) => (
              <motion.div
                key={item}
                className="skills__item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
