import React, { createContext, useContext, useState } from 'react';
import { en } from '../translations/en';
import { fr } from '../translations/fr';

const LanguageContext = createContext(null);

const translations = { en, fr };

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(null); // null = not chosen yet

  const t = language ? translations[language] : null;

  const selectLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, selectLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
