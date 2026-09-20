// Fichier : src/app/premium/objectifs/page.js
'use client';

import { useState } from 'react';
import { SCEI_ECOLES } from '@/data/scei';

export default function ObjectifsPage() {
  const [ecoleNom, setEcoleNom] = useState(SCEI_ECOLES[0].ecole);
  const [moyenneActuelle, setMoyenneActuelle] = useState('');
  const [coefDejaFait, setCoefDejaFait] = useState('');
  const [coefRestant, setCoefRestant] = useState('');

  const ecole = SCEI_ECOLES.find((e) => e.ecole === ecoleNom);

  const mA = parseFloat(moyenneActuelle);
  const cF = parseFloat(coefDejaFait);
  const cR = parseFloat(coefRestant);

  let noteNecessaire = null;
  if (!Number.isNaN(mA) && !Number.isNaN(cF) && !Number.isNaN(cR) && cR > 0) {
    const seuil = ecole.seuilAdmissibilite;
    noteNecessaire = ((seuil * (cF + cR)) - (mA * cF)) / cR;
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-soft text-amber font-bold text-sm mb-3">Premium ⭐</span>
          <h1 className="font-heading text-3xl font-extrabold text-ink">Planificateur d'objectifs de concours</h1>
          <p className="text-ink-soft mt-1">Simule la moyenne à viser sur tes épreuves restantes pour atteindre le seuil d'admissibilité.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">
          <select
            value={ecoleNom}
            onChange={(e) => setEcoleNom(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-soft"
          >
            {SCEI_ECOLES.map((e) => (
              <option key={e.ecole} value={e.ecole}>{e.ecole} — seuil {e.seuilAdmissibilite}/20</option>
            ))}
          </select>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-ink-soft">Moyenne actuelle</label>
              <input type="number" step="0.1" min="0" max="20" value={moyenneActuelle}
                onChange={(e) => setMoyenneActuelle(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-soft">Coef déjà acquis</label>
              <input type="number" min="0" value={coefDejaFait}
                onChange={(e) => setCoefDejaFait(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-soft">Coef restant (écrits)</label>
              <input type="number" min="0" value={coefRestant}
                onChange={(e) => setCoefRestant(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
            </div>
          </div>
        </div>

        {noteNecessaire !== null && (
          <div className="mt-6 p-6 rounded-3xl bg-amber-soft border-2 border-amber text-center">
            <p className="text-sm font-bold text-ink-soft">Moyenne à viser sur les épreuves restantes</p>
            <p className="font-heading text-5xl font-extrabold text-ink mt-1">
              {noteNecessaire > 20 ? '> 20' : noteNecessaire < 0 ? 'déjà acquis' : `${noteNecessaire.toFixed(1)} / 20`}
            </p>
            {noteNecessaire > 20 && (
              <p className="text-ink-soft text-sm mt-2">Objectif hors d'atteinte avec ces écrits seuls — vise une école au seuil plus accessible.</p>
            )}
          </div>
        )}

        <p className="text-xs text-ink-soft mt-4 text-center">
          Simulation indicative basée sur le seuil d'admissibilité {ecole.anneeRef} de l'école. Les seuils varient chaque année.
        </p>
      </div>
    </main>
  );
}