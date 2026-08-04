import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SectionRail from './layout/SectionRail';
import './Experience.css';

function jobMarker(period, index, nowLabel) {
  if (index === 0) return nowLabel;
  const years = period.match(/\d{4}/g) || [];
  if (years.length >= 2) {
    const a = years[0].slice(2);
    const b = years[1].slice(2);
    return a === b ? years[0] : `${a}→${b}`;
  }
  return years[0] || String(index + 1).padStart(2, '0');
}

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section section--exp">
      <SectionRail marker="01" label={t.nav.experience} />

      <div className="section__body">
        <motion.h2
          className="section__headline"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.experience.subtitle}
        </motion.h2>

        <div className="timeline">
          {t.experience.jobs.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              className="job"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="job__time">
                {jobMarker(job.period, i, t.ui.now)}
                <small>{job.period}</small>
              </div>

              <div className="job__content">
                <h3 className="job__role">{job.role}</h3>
                <p className="job__company">
                  {job.company}
                  {job.type ? <span className="job__type">{job.type}</span> : null}
                </p>
                {job.location ? (
                  <p className="job__location">{job.location}</p>
                ) : null}

                <ul className="job__bullets">
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ul>

                <div className="job__tech">
                  {job.tech.map((tech) => (
                    <span key={tech} className="job__chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
