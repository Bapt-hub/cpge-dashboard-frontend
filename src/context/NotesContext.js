// Fichier : src/context/NotesContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const NOTES_DEFAUT = [
  { id: 1, date: '2026-10-24', matiere: 'Physique', type: 'DS', note: 14.5, coef: 5, moyClasse: 11.2 },
  { id: 2, date: '2026-10-18', matiere: 'Mathématiques', type: 'Colle', note: 16.0, coef: 6, moyClasse: null },
];

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(NOTES_DEFAUT);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    try {
      const sauvegarde = window.localStorage.getItem('prepadash_notes');
      if (sauvegarde) setNotes(JSON.parse(sauvegarde));
    } catch {
      // ignore
    }
    setPret(true);
  }, []);

  useEffect(() => {
    if (pret) window.localStorage.setItem('prepadash_notes', JSON.stringify(notes));
  }, [notes, pret]);

  function ajouterNote(note) {
    setNotes((prev) => [{ ...note, id: Date.now() }, ...prev]);
  }

  function supprimerNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  const totalCoef = notes.reduce((s, n) => s + n.coef, 0);
  const moyenneGenerale = totalCoef
    ? notes.reduce((s, n) => s + n.note * n.coef, 0) / totalCoef
    : null;

  return (
    <NotesContext.Provider value={{ notes, ajouterNote, supprimerNote, moyenneGenerale, totalCoef, pret }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes doit être utilisé dans un NotesProvider');
  return ctx;
}