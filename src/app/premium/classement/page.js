// Fichier : src/app/premium/classement/page.js
'use client';

import { useState } from 'react';
import { FILIERES, FILIERES_LISTE } from '@/data/filieres';

// Distribution simulée : moyenne et écart-type observés par filière (à remplacer par les vraies données crowdsourcées)
const DISTRIBUTION = {
  MPSI: { moyenne: 11.5, ecartType: 2.3, effectif: 5200 },
  PCSI: { moyenne: 11.2, ecartType: 2.1, effectif: 4800 },
  ECG: { moyenne: 11.8, ecartType: 2.5, effectif: 6100 },
  BCPST: { moyenne: 11.4, ecartType: 2.0, effectif: 3600 },
};

// Approximation de la fonction de répartition d'une loi normale (erf)
function cdfNormale(x, moyenne, ecartType) {
  const z = (x - moyenne) / (ecartType * Math.SQRT2);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  const erf = z >= 0 ? y : -y;
  return 0.5 * (1 + erf);
}

export default function ClassementPage() {
  const [filiere, setFiliere] = useState('MPSI');
  const [moyenne, setMoyenne] = useState('');

  const dist = DISTRIBUTION[filiere];
  const val = parseFloat(moyenne);
  const percentile = !Number.isNaN(val) ? cdfNormale(val, dist.moyenne, dist.ecartType) : null;
  const rangEstime = percentile !== null ? Math.max(1, Math.round(dist.effectif * (1 - percentile))) : null;
  const rangBas = rangEstime ? Math.round(rangEstime * 0.75) : null;
  const rangHaut = rangEstime ? Math.round(rangEstime * 1.25) : null;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-soft text-amber font-bold text-sm mb-3">Premium ⭐</span>
          <h1 className="font-heading text-3xl font-extrabold text-ink">Classement national estimé</h1>
          <p className="text-ink-soft mt-1">
            Comparaison crowdsourcée avec les {DISTRIBUTION[filiere].effectif.toLocaleString('fr-FR')} élèves de {filiere} utilisant PrépaDash.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">
          <div className="flex gap-2 flex-wrap">
            {FILIERES_LISTE.map((f) => (
              <button
                key={f}
                onClick={() => setFiliere(f)}
                className={`px-4 py-2 rounded-full font-bold transition-colors ${
                  filiere === f ? 'bg-sky text-white' : 'bg-sky-soft/60 text-ink-soft'
                }`}
              >
                {FILIERES[f].label}
              </button>
            ))}
          </div>

          <input
            type="number" step="0.1" min="0" max="20" placeholder="Ta moyenne générale actuelle"
            value={moyenne}
            onChange={(e) => setMoyenne(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-sky-soft"
          />
        </div>

        {rangEstime && (
          <div className="mt-6 p-6 rounded-3xl bg-amber-soft border-2 border-amber text-center">
            <p className="text-sm font-bold text-ink-soft">Rang national estimé</p>
            <p className="font-heading text-4xl font-extrabold text-ink mt-1">{rangBas} — {rangHaut}ᵉ</p>
            <p className="text-ink-soft text-sm mt-2">sur environ {dist.effectif.toLocaleString('fr-FR')} élèves de ta filière</p>
          </div>
        )}

        <p className="text-xs text-ink-soft mt-4 text-center">
          Estimation basée sur les moyennes déclarées par les utilisateurs Premium. Plus la communauté grandit, plus elle est précise.
        </p>
      </div>
    </main>
  );
}