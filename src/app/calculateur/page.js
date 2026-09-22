// Fichier : src/app/calculateur/page.js
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FILIERES } from '@/data/filieres';
import { useProfile } from '@/context/ProfileContext';
import { useNotes } from '@/context/NotesContext';

const COULEURS_ROTATION = ['sky', 'coral', 'mint', 'violet', 'amber'];
const POINT_COULEUR = {
  sky: 'bg-sky',
  coral: 'bg-coral',
  mint: 'bg-mint',
  violet: 'bg-violet',
  amber: 'bg-amber',
};

export default function CalculateurPage() {
  const { profil } = useProfile();
  const { notes } = useNotes();

  const matieres = FILIERES[profil.filiere].matieres;

  const [notesParMatiere, setNotesParMatiere] = useState(
    Object.fromEntries(matieres.map((m) => [m.nom, '']))
  );

  function reprendreMesNotes() {
    const moyennesParMatiere = {};
    matieres.forEach((m) => {
      const notesMatiere = notes.filter((n) => n.matiere === m.nom);
      if (notesMatiere.length) {
        const totalCoef = notesMatiere.reduce((s, n) => s + n.coef, 0);
        moyennesParMatiere[m.nom] = (notesMatiere.reduce((s, n) => s + n.note * n.coef, 0) / totalCoef).toFixed(2);
      }
    });
    setNotesParMatiere((prev) => ({ ...prev, ...moyennesParMatiere }));
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

        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-ink">Calculateur de moyenne</h1>
            <p className="text-ink-soft mt-1">
              Filière {FILIERES[profil.filiere].label} — <Link href="/profil" className="underline hover:text-sky-deep">changer depuis mon profil</Link>
            </p>
          </div>
          <button onClick={reprendreMesNotes} className="px-4 py-2 rounded-full bg-violet text-white font-bold text-sm hover:brightness-110 transition-all">
            Reprendre mes notes
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">
          {matieres.map((m, i) => {
            const couleur = COULEURS_ROTATION[i % COULEURS_ROTATION.length];
            return (
              <div key={m.nom} className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${POINT_COULEUR[couleur]} shrink-0`} aria-hidden="true" />
                <span className="w-48 font-semibold text-ink">{m.nom}</span>
                <span className="text-ink-soft text-sm w-16">coef {m.coef}</span>
                <input
                  type="number" step="0.25" min="0" max="20" placeholder="/ 20"
                  value={notesParMatiere[m.nom]}
                  onChange={(e) => setNotesParMatiere({ ...notesParMatiere, [m.nom]: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-sky-soft"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-sky to-violet text-white text-center">
          <p className="text-sm text-white/80 font-semibold">Moyenne générale pondérée</p>
          <p className="font-heading text-4xl font-extrabold mt-1">
            {moyenne ?? '—'} {moyenne && '/ 20'}
          </p>
        </div>
      </div>
    </main>
  );
}