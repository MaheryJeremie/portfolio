import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Education.css';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="edu section--airy">
      <div className="edu__num" aria-hidden="true">05</div>
      <div className="edu__inner">

        <motion.div
          className="edu__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="edu__eyebrow">{t.education.subtitle}</span>
          <h2 className="edu__title">{t.education.title}</h2>
        </motion.div>

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
