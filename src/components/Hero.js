import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import HeroScene from './three/HeroScene';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero">
      {/* 3D canvas right half */}
      <div className="hero__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Glow radial */}
      <div className="hero__glow" aria-hidden="true" />

      {/* Content */}
      <div className="hero__body">
        {/* Top bar */}
        <div className="hero__topbar">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            {t.hero.eyebrow}
          </motion.span>
          <motion.div
            className="hero__avail"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="hero__avail-dot" />
            <span>{t.hero.available}</span>
          </motion.div>
        </div>

        {/* Name */}
        <div className="hero__name-block">
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__name-line">{t.hero.name1}</span>
            <span className="hero__name-line hero__name-indent">
              {t.hero.name2.slice(0, -3)}<em>{t.hero.name2.slice(-3)}</em>
            </span>
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

        {/* Bottom stats + CTA */}
        <motion.div
          className="hero__foot"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="hero__stats">
            <div className="hero__stat">
              <b>{t.hero.stat1Val}</b><span>{t.hero.stat1Lab}</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <b>{t.hero.stat2Val}</b><span>{t.hero.stat2Lab}</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <b>{t.hero.stat3Val}</b><span>{t.hero.stat3Lab}</span>
            </div>
          </div>

          <div className="hero__cta">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.cta}
            </button>
            <a
              href="https://github.com/MaheryJeremie"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--outline"
            >
              {t.hero.ctaGithub}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
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
