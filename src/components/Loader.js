import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Loader.css';

export default function Loader({ onComplete }) {
  const { t } = useLanguage();
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
          <div className="ldr__grain" aria-hidden="true" />

          <div className="ldr__inner">
            <div className="ldr__name" aria-label="Mahery Ramahay">
              <div className="ldr__overflow">
                <motion.span
                  className="ldr__line"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  MAHERY
                </motion.span>
              </div>
              <div className="ldr__overflow">
                <motion.span
                  className="ldr__line ldr__line--lime"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.24, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  RAMAHAY
                </motion.span>
              </div>
            </div>

            <motion.div
              className="ldr__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
