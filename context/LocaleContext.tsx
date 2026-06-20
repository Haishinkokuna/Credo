import React, { createContext, useContext, useState, ReactNode } from 'react';
import { i18n } from '@/i18n';

const LocaleContext = createContext({
  locale: i18n.locale,
  toggleLanguage: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState(i18n.locale);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};
