import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './ContactForm.css';

/* Gratuit — https://web3forms.com (250 messages/mois, sans carte bancaire) */
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

export function isContactFormEnabled() {
  return Boolean(WEB3FORMS_KEY);
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  if (!WEB3FORMS_KEY) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: 'Portfolio — nouveau message',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setForm({ name: '', email: '', message: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const statusMessage = {
    success: t.cta.form.success,
    error: t.cta.form.error,
  }[status];

  return (
    <motion.div
      id="contact-form"
      className="contact-form"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <h3 className="contact-form__title">{t.cta.form.title}</h3>

      <form className="contact-form__form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__row">
          <label className="contact-form__field">
            <span className="contact-form__label">{t.cta.form.name}</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="contact-form__input"
            />
          </label>
          <label className="contact-form__field">
            <span className="contact-form__label">{t.cta.form.email}</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="contact-form__input"
            />
          </label>
        </div>

        <label className="contact-form__field">
          <span className="contact-form__label">{t.cta.form.message}</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="contact-form__input contact-form__textarea"
          />
        </label>

        <button
          type="submit"
          className="contact-form__submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? t.cta.form.sending : t.cta.form.send}
        </button>

        {statusMessage && (
          <p className={`contact-form__status contact-form__status--${status}`} role="status">
            {statusMessage}
          </p>
        )}
      </form>
    </motion.div>
  );
}
