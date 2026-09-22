// Fichier : src/context/ProfileContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export const PROFIL_DEFAUT = {
  prenom: '',
  nom: '',
  classe: '',
  filiere: 'MPSI',
  etablissement: '',
  ville: '',
  objectifMoyenne: '',
  niveauLycee: 'standard', // 'standard' | 'selectif' | 'tres_selectif' — utilisé pour ajuster le classement national estimé
  onboardingTermine: false,
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profil, setProfilState] = useState(PROFIL_DEFAUT);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const sauvegarde = window.localStorage.getItem('prepadash_profil');
      if (sauvegarde) setProfilState({ ...PROFIL_DEFAUT, ...JSON.parse(sauvegarde) });
    } catch {
      // localStorage indisponible ou données corrompues : on garde le profil par défaut
    }
    setPret(true);
  }, []);

  function setProfil(nouveauProfil) {
    setProfilState(nouveauProfil);
    window.localStorage.setItem('prepadash_profil', JSON.stringify(nouveauProfil));
  }

  return (
    <ProfileContext.Provider value={{ profil, setProfil, pret }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile doit être utilisé dans un ProfileProvider');
  return ctx;
}