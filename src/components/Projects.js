import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Projects.css';

export default function Projects() {
  const { t } = useLanguage();
  const [feat, ...rest] = t.projects.items;

  return (
    <section id="projects" className="projects section--dense">
      <div className="projects__num" aria-hidden="true">02</div>

      <div className="projects__inner">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="projects__eyebrow">{t.projects.subtitle}</span>
          <h2 className="projects__title">{t.projects.title}</h2>
        </motion.div>

        <div className="projects__bento">
          <motion.div
            className="project-card project-card--featured"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <span className="project-card__tag">{feat.tag}</span>
            <div className="project-card__badge">{t.projects.featured}</div>
            <h3 className="project-card__name">{feat.name}</h3>
            <p className="project-card__desc">{feat.description}</p>
            <div className="project-card__tech">
              {feat.tech.map((tech) => (
                <span key={tech} className="project-card__tech-tag">{tech}</span>
              ))}
            </div>
            {feat.github && (
              <a href={feat.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                {t.common.github}
              </a>
            )}
            {feat.live && (
              <a href={feat.live} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--live">
                {t.common.live}
              </a>
            )}
          </motion.div>

          {rest.map((project, i) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <span className="project-card__tag">{project.tag}</span>
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="project-card__tech-tag">{tech}</span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                  {t.common.github}
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--live">
                  {t.common.live}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
