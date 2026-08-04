import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { publicUrl } from '../utils/publicUrl';
import SectionRail from './layout/SectionRail';
import './Projects.css';

function repoLabel(url, t) {
  if (url && /gitlab\.com/i.test(url)) return t.common.gitlab;
  return t.common.github;
}

function ProjectCase({ project, index, problemLabel, resultLabel, t }) {
  const n = String(index + 1).padStart(2, '0');
  const flip = index % 2 === 1;

  return (
    <motion.article
      className={`case${flip ? ' case--flip' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="case__index" aria-hidden="true">
        <span className="case__num">{n}</span>
        <span className="case__rule" />
      </div>

      <div className="case__media">
        <img
          src={publicUrl(project.image)}
          alt={project.imageAlt || project.name}
          className="case__image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="case__copy">
        {project.tag ? <p className="case__tag">{project.tag}</p> : null}

        <h3 className="case__name">{project.name}</h3>

        <div className="case__brief">
          <div className="case__col">
            <span className="case__label">{problemLabel}</span>
            <p>{project.problem}</p>
          </div>
          <div className="case__col">
            <span className="case__label">{resultLabel}</span>
            <p>{project.result}</p>
          </div>
        </div>

        <div className="case__meta">
          <ul className="case__tech">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="case__links">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="case__link"
              >
                {repoLabel(project.github, t)}
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="case__link case__link--live"
              >
                {t.common.live}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section projects section--projects">
      <SectionRail marker="02" label={t.nav.projects} />

      <div className="section__body projects__inner">
        <motion.h2
          className="section__headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.projects.subtitle}
        </motion.h2>

        <div className="projects__list">
          {t.projects.items.map((project, i) => (
            <ProjectCase
              key={project.name}
              project={project}
              index={i}
              problemLabel={t.projects.problem}
              resultLabel={t.projects.result}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
