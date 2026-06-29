import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileImage from './ProfileImage';
import HeroScene from './three/HeroScene';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setShow3d(!mqMobile.matches && !mqMotion.matches);
    update();

    mqMobile.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero__canvas" aria-hidden="true">
        {show3d ? (
          <Suspense fallback={<div className="hero__canvas-fallback" />}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="hero__canvas-fallback" />
        )}
      </div>

      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__body">
        <div className="hero__grid">
          <div className="hero__col">
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

            <motion.div
              className="hero__foot"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div className="hero__cta">
                <button
                  type="button"
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

          <motion.figure
            className="hero__portrait"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__portrait-frame">
              <ProfileImage
                className="hero__portrait-img"
                alt={t.hero.photoAlt}
                loading="eager"
              />
              <span className="hero__portrait-accent" aria-hidden="true" />
            </div>
          </motion.figure>
        </div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
            <span key={i} className="hero__marquee-item">
              {item}<span className="hero__marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">{t.hero.scroll}</span>
      </div>
    </section>
  );
}
