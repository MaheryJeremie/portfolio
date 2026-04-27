import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import HeroScene from './three/HeroScene';
import './Hero.css';

const MARQUEE = [
  'React', 'Node.js', 'Python', 'LangChain', 'Next.js',
  'Angular', 'MongoDB', 'Google Gemini', 'LangGraph', 'AI Engineering',
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      {/* Right 3D canvas */}
      <div className="hero__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content layer */}
      <div className="hero__body">
        {/* Top bar */}
        <div className="hero__topbar">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Fullstack Dev &nbsp;·&nbsp; AI Engineer &nbsp;·&nbsp; 2025
          </motion.span>
          <motion.div
            className="hero__avail"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="hero__avail-dot" />
            <span>Available</span>
          </motion.div>
        </div>

        {/* Name block */}
        <div className="hero__name-block">
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__name-line">Nala</span>
            <span className="hero__name-line hero__name-indent">Reha<em>reha</em></span>
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            {t.hero.description}
          </motion.p>
        </div>

        {/* Bottom row: stats + CTA */}
        <motion.div
          className="hero__foot"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
        >
          <div className="hero__stats">
            <div className="hero__stat">
              <b>3+</b><span>Years</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <b>5+</b><span>Projects</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <b>4</b><span>Languages</span>
            </div>
          </div>

          <div className="hero__cta">
            <button
              className="hero__btn hero__btn--dark"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.cta}
            </button>
            <a
              href="https://github.com/rehareha"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--outline"
            >
              GitHub &nbsp;↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="hero__marquee-item">
              {item}<span className="hero__marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-bar" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
