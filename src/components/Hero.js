import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getSkillIcon } from '../utils/skillIcons';
import ScrollFrameAnim from './ScrollFrameAnim';
import './Hero.css';
import './ScrollFrameAnim.css';

const CHAPTERS = [
  { id: 'identity', to: 0.34 },
  { id: 'stack', to: 0.67 },
  { id: 'cta', to: 1.01 },
];

function chapterIndex(progress) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < CHAPTERS.length; i += 1) {
    if (p < CHAPTERS[i].to) return i;
  }
  return CHAPTERS.length - 1;
}

const ease = [0.16, 1, 0.3, 1];
const panelMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease },
};

export default function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const showScrollRef = useRef(true);
  const [active, setActive] = useState(0);
  const [showScroll, setShowScroll] = useState(true);
  const story = t.hero.story;
  const stackItems = useMemo(() => story?.stack?.items ?? [], [story]);
  const iconColor = isDark ? '8FA3C4' : '3B5BDB';

  useEffect(() => {
    let raf = 0;

    const read = () => {
      const track = trackRef.current;
      if (!track) return 0;
      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.min(1, Math.max(0, -track.getBoundingClientRect().top / maxScroll));
    };

    const syncChapter = (next) => {
      const chapter = chapterIndex(next);
      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
      const show = next < 0.92;
      if (show !== showScrollRef.current) {
        showScrollRef.current = show;
        setShowScroll(show);
      }
    };

    const onScroll = () => {
      // Sync immediately so the frame scrubber never reads a stale value
      progressRef.current = read();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => syncChapter(progressRef.current));
    };

    progressRef.current = read();
    syncChapter(progressRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero hero--story">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__orb-wrap hero__orb-wrap--blue" aria-hidden="true">
        <div className="hero__orb hero__orb--blue" />
      </div>
      <div className="hero__orb-wrap hero__orb-wrap--purple" aria-hidden="true">
        <div className="hero__orb hero__orb--purple" />
      </div>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__mark" aria-hidden="true">MR</div>

      <div ref={trackRef} className="hero__track">
        <div className="hero__pin">
          <div className="hero__body">
            <div className="hero__content">
              <div className="hero__name-block">
                <div className="hero__progress" aria-hidden="true">
                  {CHAPTERS.map((ch, i) => (
                    <span
                      key={ch.id}
                      className={`hero__progress-dot${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {active === 0 && (
                    <motion.h1
                      key="name-full"
                      className="hero__name"
                      {...panelMotion}
                    >
                      <span className="hero__name-line hero__name-line--top">{t.hero.name1}</span>
                      <span className="hero__name-line hero__name-line--bottom">
                        {t.hero.name2.slice(0, -3)}
                        <em>{t.hero.name2.slice(-3)}</em>
                      </span>
                    </motion.h1>
                  )}
                </AnimatePresence>

                <div className="hero__details">
                  <div className="hero__photo">
                    <div className="hero__photo-glow" aria-hidden="true" />
                    <ScrollFrameAnim
                      progressRef={progressRef}
                      className="hero__photo-img hero__frame"
                    />
                    <div className="hero__photo-scrim" aria-hidden="true" />
                  </div>

                  <div className="hero__story-slot" aria-live="polite">
                    <AnimatePresence mode="wait">
                      {active === 0 && (
                        <motion.div key="identity" className="hero__story-panel" {...panelMotion}>
                          <div className="hero__meta">
                            <span className="hero__eyebrow">{t.hero.eyebrow}</span>
                            <div className="hero__avail">
                              <span className="hero__avail-dot" />
                              <span>{t.hero.available}</span>
                            </div>
                          </div>
                          <p className="hero__desc">{t.hero.description}</p>
                        </motion.div>
                      )}

                      {active === 1 && story?.stack && (
                        <motion.div key="stack" className="hero__story-panel hero__story-panel--stack" {...panelMotion}>
                          <p className="hero__panel-label">{story.stack.label}</p>
                          <p className="hero__panel-title">{story.stack.title}</p>
                          <div className="hero__stack-grid">
                            {stackItems.map((item) => {
                              const icon = getSkillIcon(item, iconColor);
                              return (
                                <div key={item} className="hero__stack-card">
                                  {icon?.type === 'cdn' && icon.tinted ? (
                                    <span
                                      className="hero__stack-icon hero__stack-icon--tinted"
                                      style={{
                                        backgroundColor: `#${icon.color}`,
                                        WebkitMaskImage: `url(${icon.src})`,
                                        maskImage: `url(${icon.src})`,
                                      }}
                                      aria-hidden="true"
                                    />
                                  ) : icon?.type === 'cdn' ? (
                                    <img
                                      src={icon.src}
                                      alt=""
                                      className="hero__stack-icon"
                                      width={40}
                                      height={40}
                                      loading="lazy"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span className="hero__stack-fallback" aria-hidden="true">
                                      {item.charAt(0)}
                                    </span>
                                  )}
                                  <span className="hero__stack-label">{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {active === 2 && (
                        <motion.div key="cta" className="hero__story-panel" {...panelMotion}>
                          <p className="hero__panel-label">{story?.cta?.label}</p>
                          <p className="hero__panel-title">{story?.cta?.title}</p>
                          <p className="hero__desc">{story?.cta?.body}</p>
                          <div className="hero__cta">
                            <button
                              type="button"
                              className="hero__btn hero__btn--primary btn-glow"
                              onClick={() => scrollTo('projects')}
                            >
                              {t.hero.cta}
                            </button>
                            <button
                              type="button"
                              className="hero__btn hero__btn--outline"
                              onClick={() => scrollTo('contact')}
                            >
                              {t.hero.ctaContact}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showScroll && (
            <div className="hero__scroll" aria-hidden="true">
              <div className="hero__scroll-line" />
              <span className="hero__scroll-label">{t.hero.scroll}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
