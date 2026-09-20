// Fichier : src/app/calculateur/page.js
'use client';

import { useState } from 'react';
import { FILIERES, FILIERES_LISTE } from '@/data/filieres';

export default function CalculateurPage() {
  const [filiere, setFiliere] = useState('MPSI');
  const matieres = FILIERES[filiere].matieres;

  const [notesParMatiere, setNotesParMatiere] = useState(
    Object.fromEntries(matieres.map((m) => [m.nom, '']))
  );

  function changerFiliere(f) {
    setFiliere(f);
    setNotesParMatiere(Object.fromEntries(FILIERES[f].matieres.map((m) => [m.nom, ''])));
  }

  const lignesRenseignees = matieres
    .map((m) => ({ ...m, valeur: parseFloat(notesParMatiere[m.nom]) }))
    .filter((m) => !Number.isNaN(m.valeur));

  const totalCoef = lignesRenseignees.reduce((s, m) => s + m.coef, 0);
  const moyenne = totalCoef
    ? (lignesRenseignees.reduce((s, m) => s + m.valeur * m.coef, 0) / totalCoef).toFixed(2)
    : null;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-ink">Calculateur de moyenne</h1>
          <p className="text-ink-soft mt-1">Renseigne tes moyennes par matière, les coefficients sont ceux de ta filière.</p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {FILIERES_LISTE.map((f) => (
            <button
              key={f}
              onClick={() => changerFiliere(f)}
              className={`px-4 py-2 rounded-full font-bold transition-colors ${
                filiere === f ? 'bg-sky text-white' : 'bg-white border border-sky-soft text-ink-soft'
              }`}
            >
              {FILIERES[f].label}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">
          {matieres.map((m) => (
            <div key={m.nom} className="flex items-center gap-4">
              <span className="w-48 font-semibold text-ink">{m.nom}</span>
              <span className="text-ink-soft text-sm w-16">coef {m.coef}</span>
              <input
                type="number" step="0.25" min="0" max="20" placeholder="/ 20"
                value={notesParMatiere[m.nom]}
                onChange={(e) => setNotesParMatiere({ ...notesParMatiere, [m.nom]: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border border-sky-soft"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-6 rounded-3xl bg-sky text-white text-center">
          <p className="text-sm text-white/80 font-semibold">Moyenne générale pondérée</p>
          <p className="font-heading text-4xl font-extrabold mt-1">
            {moyenne ?? '—'} {moyenne && '/ 20'}
          </p>
        </div>
      </div>
    </main>
  );
}