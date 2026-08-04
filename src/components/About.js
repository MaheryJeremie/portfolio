import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SectionRail from './layout/SectionRail';
import './About.css';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.1, duration: 0.75, ease },
  }),
};

export default function About() {
  const { t } = useLanguage();
  const [lead, ...body] = t.about.paragraphs;

  const metaItems = [
    { label: t.about.meta.location, value: t.about.location, href: null },
    { label: t.about.meta.email, value: t.about.email, href: `mailto:${t.about.email}` },
    { label: t.about.meta.phone, value: t.about.phone, href: `tel:${t.about.phone.replace(/\s/g, '')}` },
    { label: t.about.meta.github, value: t.about.github, href: t.about.githubUrl },
    { label: t.about.meta.linkedin, value: t.about.linkedin, href: t.about.linkedinUrl },
  ];

  return (
    <section id="about" className="section section--airy about section--about">
      <SectionRail marker="04" label={t.nav.about} />

      <div className="section__body about__inner">
        <motion.h2
          className="section__headline about__title"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease }}
        >
          {t.about.subtitle}
        </motion.h2>

        <div className="folio">
          <motion.blockquote
            className="folio__pull"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="folio__mark" aria-hidden="true">“</span>
            <p className="folio__quote">{lead}</p>
          </motion.blockquote>

          <div className="folio__body">
            {body.map((p, i) => (
              <motion.p
                key={i}
                className="folio__para"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          className="dossier"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="dossier__rail" role="list">
            {metaItems.map(({ label, value, href }) => (
              <div className="dossier__cell" role="listitem" key={label}>
                <span className="dossier__k">{label}</span>
                {href ? (
                  <a
                    className="dossier__v dossier__link"
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {value}
                  </a>
                ) : (
                  <span className="dossier__v">{value}</span>
                )}
              </div>
            ))}
            <div className="dossier__cell dossier__cell--status" role="listitem">
              <span className="dossier__k">{t.about.meta.status}</span>
              <span className="dossier__v dossier__avail">
                <span className="dossier__pulse" aria-hidden="true" />
                {t.hero.available}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="folio__foot"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <div className="folio__block">
            <p className="folio__label">{t.about.interests.title}</p>
            <ul className="folio__interests">
              {t.about.interests.items.map((item) => (
                <li key={item} className="folio__interest">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="folio__block">
            <p className="folio__label">{t.about.languages.title}</p>
            <ul className="folio__langs">
              {t.about.languages.items.map((l) => (
                <li key={l.lang} className="folio__lang">
                  <span className="folio__lang-name">{l.lang}</span>
                  <span className="folio__lang-rule" aria-hidden="true" />
                  <span className="folio__lang-level">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
