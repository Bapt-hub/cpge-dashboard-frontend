// Fichier : src/app/scei/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SCEI_ECOLES } from '@/data/scei';
import { FILIERES, FILIERES_VISEES } from '@/data/filieres';
import { useProfile } from '@/context/ProfileContext';

export default function SceiPage() {
  const { profil } = useProfile();
  const [recherche, setRecherche] = useState('');

  const filieresVisees = FILIERES_VISEES[profil.filiere] ?? [profil.filiere];

  const resultats = SCEI_ECOLES
    .filter((e) => e.filieres.some((f) => filieresVisees.includes(f)))
    .filter((e) => e.ecole.toLowerCase().includes(recherche.toLowerCase()));

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <h1 className="font-heading text-3xl font-extrabold text-ink">Annuaire SCEI</h1>
          <p className="text-ink-soft mt-1">
            Écoles accessibles depuis ta filière — <span className="px-2 py-0.5 rounded-full bg-violet-soft text-violet font-bold text-sm">{FILIERES[profil.filiere]?.label ?? profil.filiere}</span>
            {' · '}<Link href="/profil" className="underline hover:text-sky-deep">changer depuis mon profil</Link>
          </p>
        </div>

        <input
          type="text"
          placeholder="Rechercher une école..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-sky-soft bg-white mb-6"
        />

        <div className="rounded-3xl bg-white border border-sky-soft overflow-hidden shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
          <table className="w-full text-left text-ink">
            <thead className="bg-violet-soft/60 border-b border-sky-soft">
              <tr>
                <th className="p-4 font-bold text-ink-soft">École</th>
                <th className="p-4 font-bold text-ink-soft">Filières</th>
                <th className="p-4 font-bold text-ink-soft text-right">Seuil admissibilité</th>
                <th className="p-4 font-bold text-ink-soft text-right">Rang dernier admis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-soft">
              {resultats.map((e) => (
                <tr key={e.ecole} className="hover:bg-sky-soft/40 transition-colors">
                  <td className="p-4 font-bold text-sky-deep">{e.ecole}</td>
                  <td className="p-4 text-sm text-ink-soft">{e.filieres.join(', ')}</td>
                  <td className="p-4 text-right font-bold">{e.seuilAdmissibilite} / 20</td>
                  <td className="p-4 text-right text-ink-soft">{e.rangDernierAdmis}</td>
                </tr>
              ))}
              {resultats.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-ink-soft">Aucune école référencée pour cette filière pour l'instant.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}