import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getSkillIcon } from '../utils/skillIcons';
import './Skills.css';

export default function Skills() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [active, setActive] = useState(t.skills.categories[0].key);
  const category = t.skills.categories.find((c) => c.key === active);
  const iconColor = isDark ? '8FA3C4' : '3B5BDB';

  return (
    <section id="skills" className="skills section--dense">
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
                type="button"
                className={`skills__tab ${active === cat.key ? 'skills__tab--active' : ''}`}
                onClick={() => setActive(cat.key)}
              >
                {cat.label}
                {active === cat.key && (
                  <motion.span
                    className="skills__tab-indicator"
                    layoutId="skills-tab"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="skills__items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {category.items.map((item, i) => {
                const icon = getSkillIcon(item, iconColor);
                return (
                  <motion.div
                    key={item}
                    className="skills__item"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  >
                    {icon?.type === 'cdn' && icon.tinted ? (
                      <span
                        className="skills__item-icon skills__item-icon--tinted"
                        style={{
                          backgroundColor: `#${icon.color}`,
                          WebkitMaskImage: `url(${icon.src})`,
                          maskImage: `url(${icon.src})`,
                        }}
                        aria-hidden="true"
                      />
                    ) : icon?.type === 'cdn' ? (
                      <img
                        src={icon.src}
                        alt=""
                        className="skills__item-icon"
                        width={22}
                        height={22}
                        loading="lazy"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="skills__item-fallback" aria-hidden="true">
                        {item.charAt(0)}
                      </span>
                    )}
                    <span className="skills__item-label">{item}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
