import React from "react";
import { motion } from "framer-motion";
import "./LanguageSelect.css";

export default function LanguageSelect({ onSelect }) {
  return (
    <div className="ls">
      <div className="ls__grain" aria-hidden="true" />

      <motion.button
        className="ls__panel ls__panel--en"
        onClick={() => onSelect("en")}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="ls__panel-code">EN</span>
        <div className="ls__panel-meta">
          <span className="ls__panel-label">English</span>
          <span className="ls__panel-sub">Continue in English</span>
        </div>
        <div className="ls__panel-fill" />
      </motion.button>

      <div className="ls__center">
        <div className="ls__overflow">
          <motion.div
            className="ls__mono"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            MR
          </motion.div>
        </div>
        <div className="ls__name-stack">
          {["MAHERY", "RAMAHAY"].map((w, i) => (
            <div key={w} className="ls__overflow">
              <motion.span
                className={`ls__name-word${i === 1 ? " ls__name-word--accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </div>
          ))}
        </div>
        <motion.p
          className="ls__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          FULLSTACK DEV &nbsp;&middot;&nbsp; 2026
        </motion.p>
      </div>

      <motion.button
        className="ls__panel ls__panel--fr"
        onClick={() => onSelect("fr")}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="ls__panel-code">FR</span>
        <div className="ls__panel-meta">
          <span className="ls__panel-label">Fran&ccedil;ais</span>
          <span className="ls__panel-sub">Continuer en Fran&ccedil;ais</span>
        </div>
        <div className="ls__panel-fill" />
      </motion.button>
    </div>
  );
}
