// Fichier : src/context/PlanningContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export const COLONNES = [
  { id: 'todo', label: 'À faire' },
  { id: 'doing', label: 'En cours' },
  { id: 'done', label: 'Terminé' },
];

const TACHES_DEFAUT = [
  { id: 1, titre: 'Fiche Cinématique du point', colonne: 'todo' },
  { id: 2, titre: 'Exercices intégrales', colonne: 'todo' },
  { id: 3, titre: 'Révision thermo', colonne: 'doing' },
  { id: 4, titre: 'Fiche vocabulaire anglais', colonne: 'done' },
];

const CONTROLES_DEFAUT = [
  { id: 1, matiere: 'Physique', sujet: 'Électromagnétisme', date: '2026-10-24' },
  { id: 2, matiere: 'Mathématiques', sujet: 'Algèbre linéaire', date: '2026-10-29' },
  { id: 3, matiere: 'Anglais', sujet: 'Compréhension écrite', date: '2026-11-05' },
];

const PlanningContext = createContext(null);

export function PlanningProvider({ children }) {
  const [taches, setTaches] = useState(TACHES_DEFAUT);
  const [controles, setControles] = useState(CONTROLES_DEFAUT);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const sauvegardeTaches = window.localStorage.getItem('prepadash_taches');
      if (sauvegardeTaches) setTaches(JSON.parse(sauvegardeTaches));
      const sauvegardeControles = window.localStorage.getItem('prepadash_controles');
      if (sauvegardeControles) setControles(JSON.parse(sauvegardeControles));
    } catch {
      // ignore
    }
    setPret(true);
  }, []);

  useEffect(() => {
    if (pret) window.localStorage.setItem('prepadash_taches', JSON.stringify(taches));
  }, [taches, pret]);

  useEffect(() => {
    if (pret) window.localStorage.setItem('prepadash_controles', JSON.stringify(controles));
  }, [controles, pret]);

  function deplacerTache(id, sens) {
    setTaches((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = COLONNES.findIndex((c) => c.id === t.colonne);
        const nouvelIdx = Math.min(Math.max(idx + sens, 0), COLONNES.length - 1);
        return { ...t, colonne: COLONNES[nouvelIdx].id };
      })
    );
  }

  function ajouterTache(titre) {
    if (!titre.trim()) return;
    setTaches((prev) => [...prev, { id: Date.now(), titre: titre.trim(), colonne: 'todo' }]);
  }

  function supprimerTache(id) {
    setTaches((prev) => prev.filter((t) => t.id !== id));
  }

  function ajouterControle({ matiere, sujet, date }) {
    if (!matiere.trim() || !date) return;
    setControles((prev) => [...prev, { id: Date.now(), matiere: matiere.trim(), sujet: sujet.trim(), date }]);
  }

  function modifierControle(id, champs) {
    setControles((prev) => prev.map((c) => (c.id === id ? { ...c, ...champs } : c)));
  }

  function supprimerControle(id) {
    setControles((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <PlanningContext.Provider value={{
      taches, deplacerTache, ajouterTache, supprimerTache,
      controles, ajouterControle, modifierControle, supprimerControle,
      pret,
    }}>
      {children}
    </PlanningContext.Provider>
  );
}

export function usePlanning() {
  const ctx = useContext(PlanningContext);
  if (!ctx) throw new Error('usePlanning doit être utilisé dans un PlanningProvider');
  return ctx;
}