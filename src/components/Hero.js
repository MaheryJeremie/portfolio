import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileImage from './ProfileImage';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallax(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const orbShift = parallax * 0.06;
  const photoShift = parallax * 0.1;

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div
        className="hero__orb-wrap hero__orb-wrap--blue"
        aria-hidden="true"
        style={{ transform: `translate(${orbShift * 0.5}px, ${orbShift}px)` }}
      >
        <div className="hero__orb hero__orb--blue" />
      </div>
      <div
        className="hero__orb-wrap hero__orb-wrap--purple"
        aria-hidden="true"
        style={{ transform: `translate(${-orbShift * 0.4}px, ${-orbShift * 0.6}px)` }}
      >
        <div className="hero__orb hero__orb--purple" />
      </div>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__mark" aria-hidden="true">MR</div>

      <div className="hero__body">
        <div className="hero__content">
          <div className="hero__name-block">
            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__name-line hero__name-line--top">{t.hero.name1}</span>
              <span className="hero__name-line hero__name-line--bottom">
                {t.hero.name2.slice(0, -3)}<em>{t.hero.name2.slice(-3)}</em>
              </span>
            </motion.h1>

            <div className="hero__details">
              <motion.div
                className="hero__meta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="hero__eyebrow">{t.hero.eyebrow}</span>
                <div className="hero__avail">
                  <span className="hero__avail-dot" />
                  <span>{t.hero.available}</span>
                </div>
              </motion.div>

              <motion.div
                className="hero__photo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: photoShift }}
              >
                <div className="hero__photo-glow" aria-hidden="true" />
                <ProfileImage
                  className="hero__photo-img"
                  alt={t.hero.photoAlt}
                  loading="eager"
                />
                <div className="hero__photo-scrim" aria-hidden="true" />
              </motion.div>

              <motion.p
                className="hero__desc"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                className="hero__foot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="hero__cta">
                  <button
                    type="button"
                    className="hero__btn hero__btn--primary btn-glow"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.cta}
                  </button>
                  <button
                    type="button"
                    className="hero__btn hero__btn--outline"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.ctaContact}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track motion-persist">
          {[...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
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
