import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { publicUrl } from '../utils/publicUrl';
import './Projects.css';

function repoLabel(url, t) {
  if (url && /gitlab\.com/i.test(url)) return t.common.gitlab;
  return t.common.github;
}

function ProjectCard({ project, featured, featuredLabel, problemLabel, resultLabel, t, index }) {
  const links = (
    <div className="project-card__links">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
          {repoLabel(project.github, t)}
        </a>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--live">
          {t.common.live}
        </a>
      )}
    </div>
  );

  return (
    <motion.article
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      initial={{ opacity: 0, y: featured ? 30 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: featured ? 0 : 0.15 + index * 0.1,
        duration: featured ? 0.7 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: featured ? -6 : -5, transition: { duration: 0.2 } }}
    >
      <div className="project-card__media">
        <img
          src={publicUrl(project.image)}
          alt={project.imageAlt || project.name}
          className="project-card__image"
          loading="lazy"
          decoding="async"
        />
        <div className="project-card__media-overlay" aria-hidden="true" />
        {featured && (
          <div className="project-card__badge">{featuredLabel}</div>
        )}
      </div>

      <div className="project-card__body">
        <span className="project-card__tag">{project.tag}</span>
        <h3 className="project-card__name">{project.name}</h3>
        <div className="project-card__desc">
          <p className="project-card__block">
            <span className="project-card__block-label">{problemLabel}</span>
            {project.problem}
          </p>
          <p className="project-card__block">
            <span className="project-card__block-label">{resultLabel}</span>
            {project.result}
          </p>
        </div>
        <div className="project-card__tech">
          {project.tech.map((tech) => (
            <span key={tech} className="project-card__tech-tag">{tech}</span>
          ))}
        </div>
        {links}
      </div>
    </motion.article>
  );
}

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
          <ProjectCard
            project={feat}
            featured
            featuredLabel={t.projects.featured}
            problemLabel={t.projects.problem}
            resultLabel={t.projects.result}
            t={t}
            index={0}
          />
          {rest.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              problemLabel={t.projects.problem}
              resultLabel={t.projects.result}
              t={t}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
