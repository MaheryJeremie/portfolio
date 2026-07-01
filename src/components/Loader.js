import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Loader.css';

export default function Loader({ onComplete }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, 950);
  }, [onComplete]);

  useEffect(() => {
    let n = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const inc = n < 60
        ? Math.floor(Math.random() * 4) + 2
        : n < 85
        ? Math.floor(Math.random() * 6) + 3
        : Math.floor(Math.random() * 9) + 5;

      n = Math.min(n + inc, 100);
      setCount(n);

      if (n >= 100) {
        setTimeout(() => { if (alive) finish(); }, 320);
        return;
      }
      const delay = n < 60 ? 65 : n < 85 ? 50 : 32;
      setTimeout(tick, delay);
    };

    setTimeout(tick, 180);
    return () => { alive = false; };
  }, [finish]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="ldr"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="ldr__ambient" aria-hidden="true">
            <div className="ldr__orb ldr__orb--chrome" />
            <div className="ldr__orb ldr__orb--blue" />
          </div>
          <div className="ldr__grain" aria-hidden="true" />

          <div className="ldr__inner">
            <motion.div
              className="ldr__card"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="ldr__logo logo-mark">MR</span>

              <div className="ldr__name" aria-label="Mahery Ramahay">
                <div className="ldr__clip">
                  <motion.span
                    className="ldr__line"
                    initial={{ y: reduceMotion ? 0 : '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  >
                    MAHERY
                  </motion.span>
                </div>
                <div className="ldr__clip">
                  <motion.span
                    className="ldr__line"
                    initial={{ y: reduceMotion ? 0 : '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <em>RAMAHAY</em>
                  </motion.span>
                </div>
              </div>

              <motion.div
                className="ldr__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <span className="ldr__label">{t.loader.initializing}</span>
                <span className="ldr__count">{String(count).padStart(3, '0')}</span>
              </motion.div>

              <div className="ldr__bar">
                <motion.div
                  className="ldr__fill"
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 0.18, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
