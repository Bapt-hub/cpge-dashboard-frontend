// Fichier : src/app/planning/page.js
'use client';

import { useState } from 'react';

const COLONNES = [
  { id: 'todo', label: 'À faire' },
  { id: 'doing', label: 'En cours' },
  { id: 'done', label: 'Terminé' },
];

const PROCHAINS_DS = [
  { matiere: 'Physique', sujet: 'Électromagnétisme', date: '2026-10-24' },
  { matiere: 'Mathématiques', sujet: 'Algèbre linéaire', date: '2026-10-29' },
  { matiere: 'Anglais', sujet: 'Compréhension écrite', date: '2026-11-05' },
];

function joursRestants(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date('2026-09-20')) / 86400000);
  return diff;
}

export default function PlanningPage() {
  const [taches, setTaches] = useState([
    { id: 1, titre: 'Fiche Cinématique du point', colonne: 'todo' },
    { id: 2, titre: 'Exercices intégrales', colonne: 'todo' },
    { id: 3, titre: 'Révision thermo', colonne: 'doing' },
    { id: 4, titre: 'Fiche vocabulaire anglais', colonne: 'done' },
  ]);

  function deplacer(id, sens) {
    setTaches((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = COLONNES.findIndex((c) => c.id === t.colonne);
        const nouvelIdx = Math.min(Math.max(idx + sens, 0), COLONNES.length - 1);
        return { ...t, colonne: COLONNES[nouvelIdx].id };
      })
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="font-heading text-3xl font-extrabold text-ink mb-8">Agenda & planning de révision</h1>

        {/* Agenda des prochains DS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {PROCHAINS_DS.map((ds) => (
            <div key={ds.sujet} className="p-5 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
              <p className="text-sm font-bold text-sky-deep">{ds.matiere}</p>
              <p className="font-heading font-bold text-ink mt-1">{ds.sujet}</p>
              <p className="text-ink-soft text-sm mt-2">{ds.date} · dans {joursRestants(ds.date)} j</p>
            </div>
          ))}
        </div>

        {/* Kanban de révision */}
        <h2 className="font-heading text-xl font-bold text-ink mb-4">Suivi des fiches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLONNES.map((col) => (
            <div key={col.id} className="p-4 rounded-3xl bg-sky-soft/50 border border-sky-soft min-h-[220px]">
              <h3 className="font-bold text-ink-soft mb-3">{col.label}</h3>
              <div className="space-y-3">
                {taches.filter((t) => t.colonne === col.id).map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-white border border-sky-soft shadow-sm flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">{t.titre}</span>
                    <div className="flex gap-1">
                      <button onClick={() => deplacer(t.id, -1)} className="w-6 h-6 rounded-full bg-sky-soft text-sky-deep text-xs font-bold">←</button>
                      <button onClick={() => deplacer(t.id, 1)} className="w-6 h-6 rounded-full bg-sky-soft text-sky-deep text-xs font-bold">→</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}