// Fichier : src/context/ReferralContext.js
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ReferralContext = createContext(null);

function genererCode(prenom) {
  const base = (prenom || 'PREPA').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6) || 'PREPA';
  const suffixe = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base}-${suffixe}`;
}

export function ReferralProvider({ children }) {
  const [monCode, setMonCode] = useState(null);
  const [filleuls, setFilleuls] = useState([]);
  const [codeUtilise, setCodeUtilise] = useState(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const sauvegarde = window.localStorage.getItem('prepadash_parrainage');
      if (sauvegarde) {
        const data = JSON.parse(sauvegarde);
        setMonCode(data.monCode ?? null);
        setFilleuls(data.filleuls ?? []);
        setCodeUtilise(data.codeUtilise ?? null);
      }
    } catch {
      // ignore
    }
    setPret(true);
  }, []);

  useEffect(() => {
    if (pret) {
      window.localStorage.setItem('prepadash_parrainage', JSON.stringify({ monCode, filleuls, codeUtilise }));
    }
  }, [monCode, filleuls, codeUtilise, pret]);

  // Génère le code une fois le prénom connu, si pas encore fait
  const initialiserCode = useCallback((prenom) => {
    setMonCode((prev) => prev ?? genererCode(prenom));
  }, []);

  function appliquerCodeParrain(code) {
    if (!code || !code.trim()) return;
    setCodeUtilise(code.trim().toUpperCase());
  }

  // Démo uniquement : simule l'inscription d'un filleul, en l'absence de vrai backend multi-utilisateurs
  function simulerFilleul(nom) {
    setFilleuls((prev) => [...prev, { id: Date.now(), nom: nom || `Ami ${prev.length + 1}` }]);
  }

  const moisOffertsGagnes = Math.floor(filleuls.length / 2);

  return (
    <ReferralContext.Provider value={{
      monCode, filleuls, codeUtilise, moisOffertsGagnes, pret,
      initialiserCode, appliquerCodeParrain, simulerFilleul,
    }}>
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const ctx = useContext(ReferralContext);
  if (!ctx) throw new Error('useReferral doit être utilisé dans un ReferralProvider');
  return ctx;
}