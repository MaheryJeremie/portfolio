import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getSkillIcon } from '../utils/skillIcons';
import SectionRail from './layout/SectionRail';
import './Skills.css';

function SkillMark({ name, color }) {
  const icon = getSkillIcon(name, color);

  if (icon?.type === 'cdn' && icon.tinted) {
    return (
      <span
        className="atlas__icon atlas__icon--tinted"
        style={{
          backgroundColor: `#${icon.color}`,
          WebkitMaskImage: `url(${icon.src})`,
          maskImage: `url(${icon.src})`,
        }}
        aria-hidden="true"
      />
    );
  }

  if (icon?.type === 'cdn') {
    return (
      <img
        src={icon.src}
        alt=""
        className="atlas__icon"
        width={15}
        height={15}
        loading="lazy"
        aria-hidden="true"
      />
    );
  }

  return null;
}

export default function Skills() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const iconColor = isDark ? '8FA3C4' : '3B5BDB';

  return (
    <section id="skills" className="section skills section--skills">
      <SectionRail marker="03" label={t.nav.skills} />

      <div className="section__body skills__inner">
        <motion.h2
          className="section__headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.skills.subtitle}
        </motion.h2>

        <div className="atlas">
          {t.skills.categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              className="atlas__col"
              style={{ '--atlas-i': i }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.06,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              <h3 className="atlas__title">{cat.label}</h3>

              <ul className="atlas__list">
                {cat.items.map((item) => (
                  <li key={item} className="atlas__item">
                    <SkillMark name={item} color={iconColor} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
