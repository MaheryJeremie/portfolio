import { motion, useReducedMotion } from 'framer-motion';

export default function QuoteBand({ mark = 'Principe', children }) {
  const reduced = useReducedMotion();

  return (
    <motion.aside
      className="quote-band"
      aria-label={mark}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="quote-band__glow" aria-hidden="true" />
      <blockquote className="quote-band__text">
        <span className="quote-band__mark">{mark}</span>
        {children}
      </blockquote>
    </motion.aside>
  );
}
