// Fichier : src/app/premium/probabilites/page.js
'use client';

import { useState, useEffect } from 'react';
import { SCEI_ECOLES } from '@/data/scei';
import PremiumGate from '@/components/PremiumGate';
import { useNotes } from '@/context/NotesContext';

// Modèle simplifié : probabilité logistique autour du seuil d'admissibilité historique.
// Écart de +2 pts au-dessus du seuil ≈ très probable ; -2 pts en dessous ≈ improbable.
function probabiliteAdmissibilite(moyenne, seuil) {
  const ecart = moyenne - seuil;
  const p = 1 / (1 + Math.exp(-1.1 * ecart));
  return Math.round(p * 100);
}

function couleur(p) {
  if (p >= 66) return 'bg-mint text-white';
  if (p >= 33) return 'bg-amber text-white';
  return 'bg-rose-500 text-white';
}

export default function ProbabilitesPage() {
  const { moyenneGenerale } = useNotes();
  const [ecoleNom, setEcoleNom] = useState(SCEI_ECOLES[0].ecole);
  const [moyenne, setMoyenne] = useState('');

  useEffect(() => {
    if (moyenneGenerale) setMoyenne(moyenneGenerale.toFixed(2));
  }, [moyenneGenerale]);

  const ecole = SCEI_ECOLES.find((e) => e.ecole === ecoleNom);
  const val = parseFloat(moyenne);
  const proba = !Number.isNaN(val) ? probabiliteAdmissibilite(val, ecole.seuilAdmissibilite) : null;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-soft text-amber font-bold text-sm mb-3">Premium ⭐</span>
          <h1 className="font-heading text-3xl font-extrabold text-ink">Probabilité d'admissibilité</h1>
          <p className="text-ink-soft mt-1">Modèle croisant ta moyenne et le seuil historique SCEI de l'école visée.</p>
        </div>

        <PremiumGate titre="Débloque la probabilité d'admissibilité">
        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">
          <select
            value={ecoleNom}
            onChange={(e) => setEcoleNom(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-soft"
          >
            {SCEI_ECOLES.map((e) => (
              <option key={e.ecole} value={e.ecole}>{e.ecole} — {e.filiere}</option>
            ))}
          </select>

          <input
            type="number" step="0.1" min="0" max="20" placeholder="Ta moyenne générale actuelle"
            value={moyenne}
            onChange={(e) => setMoyenne(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-soft"
          />

          <p className="text-sm text-ink-soft">
            Seuil d'admissibilité {ecole.anneeRef} : <b>{ecole.seuilAdmissibilite} / 20</b> (rang dernier admis : {ecole.rangDernierAdmis})
          </p>
        </div>

        {proba !== null && (
          <div className={`mt-6 p-6 rounded-3xl text-center ${couleur(proba)}`}>
            <p className="text-sm font-bold opacity-90">Probabilité d'admissibilité estimée</p>
            <p className="font-heading text-5xl font-extrabold mt-1">{proba} %</p>
          </div>
        )}
        </PremiumGate>

        <p className="text-xs text-ink-soft mt-4 text-center">
          Estimation indicative basée sur les données SCEI historiques. Ne remplace pas les résultats réels du concours.
        </p>
      </div>
    </main>
  );
}