// Fichier : src/context/PremiumContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const PremiumContext = createContext(null);

export function PremiumProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    const sauvegarde = window.localStorage.getItem('prepadash_premium');
    if (sauvegarde === 'true') setIsPremium(true);
    setPret(true);
  }, []);

  function activerPremium() {
    setIsPremium(true);
    window.localStorage.setItem('prepadash_premium', 'true');
  }

  function desactiverPremium() {
    setIsPremium(false);
    window.localStorage.removeItem('prepadash_premium');
  }

  return (
    <PremiumContext.Provider value={{ isPremium, pret, activerPremium, desactiverPremium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error('usePremium doit être utilisé dans un PremiumProvider');
  return ctx;
}