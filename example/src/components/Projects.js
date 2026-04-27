import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Projects.css';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="projects">
      <div className="projects__num" aria-hidden="true">05</div>
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

        <div className="projects__grid">
          {t.projects.items.map((project, i) => (
            <motion.div
              key={project.name}
              className={`project-card ${project.highlight ? 'project-card--highlight' : ''}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {project.highlight && (
                <span className="project-card__badge">
                  {t.lang === 'fr' ? 'Featured' : 'Featured'}
                </span>
              )}
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="project-card__tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-card__footer">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
