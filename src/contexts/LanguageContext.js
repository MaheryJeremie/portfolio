import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { fr } from '../translations/fr';
import { fetchSanityContent, mergeContent } from '../lib/fetchContent';

const LanguageContext = createContext(null);
const translations = { en, fr };
const STORAGE_KEY = 'portfolio-lang';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && translations[saved] ? saved : null;
  });
  const [remoteByLang, setRemoteByLang] = useState({ en: null, fr: null });

  const local = language ? translations[language] : null;
  const t = language ? mergeContent(local, remoteByLang[language]) : null;

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    if (language) {
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [frRemote, enRemote] = await Promise.all([
          fetchSanityContent('fr'),
          fetchSanityContent('en'),
        ]);
        if (cancelled) return;
        setRemoteByLang({ fr: frRemote, en: enRemote });
      } catch (err) {
        console.warn('[sanity] Falling back to local translations:', err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, selectLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
