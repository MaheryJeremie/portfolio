import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SectionRail from './layout/SectionRail';
import './Education.css';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="section edu section--airy">
      <SectionRail marker="05" label={t.nav.education} />
      <div className="section__body edu__inner">

        <motion.h2
          className="section__headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.education.subtitle}
        </motion.h2>

        <div className="edu__list">
          {t.education.items.map((item, i) => (
            <motion.div
              key={i}
              className="edu__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="edu__item-left">
                <span className="edu__period">{item.period}</span>
                <span className="edu__location">{item.location}</span>
              </div>

              <div className="edu__item-line" aria-hidden="true">
                <span className="edu__item-dot" />
                <span className="edu__item-track" />
              </div>

              <div className="edu__item-right">
                <h3 className="edu__degree">{item.degree}</h3>
                <p className="edu__school">{item.school}</p>
                <p className="edu__desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
