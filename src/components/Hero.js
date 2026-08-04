import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getSkillIcon } from '../utils/skillIcons';
import { scrollToSection } from '../utils/scrollToSection';
import ScrollFrameAnim from './ScrollFrameAnim';
import Magnetic from './motion/Magnetic';
import './motion/motion.css';
import './Hero.css';
import './ScrollFrameAnim.css';

const CHAPTERS = [
  { id: 'identity', to: 0.36 },
  { id: 'stack', to: 0.7 },
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
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.42, ease },
};

export default function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const showScrollRef = useRef(true);
  const introPlayedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [showScroll, setShowScroll] = useState(true);
  const story = t.hero.story;
  const craft = useMemo(() => story?.stack?.items ?? [], [story]);
  const iconColor = isDark ? '8FA3C4' : '3B5BDB';

  useEffect(() => {
    introPlayedRef.current = true;
  }, []);

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
      const show = next < 0.9;
      if (show !== showScrollRef.current) {
        showScrollRef.current = show;
        setShowScroll(show);
      }
    };

    const onScroll = () => {
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
    scrollToSection(lenis, id);
  };

  return (
    <section id="hero" className="hero hero--story">
      <div className="hero__field" aria-hidden="true" />

      <div ref={trackRef} className="hero__track">
        <div className="hero__pin">
          <div className="hero__stage">
            <div className="hero__copy">
              <div className="hero__progress" aria-hidden="true">
                {CHAPTERS.map((ch, i) => (
                  <span
                    key={ch.id}
                    className={`hero__progress-seg${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  />
                ))}
              </div>

              <p className="hero__kicker">{t.hero.eyebrow}</p>

              <h1 className="hero__name">
                <span className="line-mask">
                  <motion.span
                    className="hero__name-line hero__name-line--first"
                    initial={reduced || introPlayedRef.current ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, ease, delay: 0.08 }}
                  >
                    {t.hero.name1}
                  </motion.span>
                </span>
                <span className="line-mask">
                  <motion.span
                    className="hero__name-line hero__name-line--last"
                    initial={reduced || introPlayedRef.current ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, ease, delay: 0.2 }}
                  >
                    {t.hero.name2}
                  </motion.span>
                </span>
              </h1>

              <div className="hero__chapter" aria-live="polite">
                <AnimatePresence mode="wait">
                  {active === 1 && story?.stack && (
                    <motion.div
                      key="stack"
                      className="hero__panel hero__panel--stack"
                      {...panelMotion}
                    >
                      <p className="hero__panel-label">{story.stack.label}</p>
                      <ul className="hero__stack">
                        {craft.map((item) => {
                          const icon = getSkillIcon(item, iconColor);
                          return (
                            <li key={item} className="hero__stack-row">
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
                                  width={22}
                                  height={22}
                                  loading="lazy"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span className="hero__stack-fallback" aria-hidden="true">
                                  {item.charAt(0)}
                                </span>
                              )}
                              <span className="hero__stack-name">{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}

                  {active === 2 && (
                    <motion.div key="cta" className="hero__panel" {...panelMotion}>
                      <p className="hero__panel-label">{story?.cta?.label}</p>
                      <p className="hero__lead">{story?.cta?.body}</p>
                      <div className="hero__actions">
                        <Magnetic>
                          <button
                            type="button"
                            className="hero__btn hero__btn--solid"
                            onClick={() => scrollTo('projects')}
                          >
                            {t.hero.cta}
                          </button>
                        </Magnetic>
                        <Magnetic>
                          <button
                            type="button"
                            className="hero__btn hero__btn--ghost"
                            onClick={() => scrollTo('contact')}
                          >
                            {t.hero.ctaContact}
                          </button>
                        </Magnetic>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              className="hero__visual"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.28 }}
            >
              <div className="hero__visual-glow" aria-hidden="true" />
              <ScrollFrameAnim
                progressRef={progressRef}
                className="hero__frame"
              />
              <div className="hero__visual-edge" aria-hidden="true" />
            </motion.div>
          </div>

          {showScroll && (
            <div className="hero__scroll" aria-hidden="true">
              <div className="hero__scroll-line">
                <span />
              </div>
              <span className="hero__scroll-label">{t.hero.scroll}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
