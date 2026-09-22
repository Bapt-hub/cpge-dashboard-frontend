// Fichier : src/lib/classement.js
//
// Logique de calcul du classement national estimé, partagée entre la carte
// d'aperçu de l'accueil et la page dédiée /premium/classement, pour garantir
// un résultat strictement identique aux deux endroits.

import { NIVEAUX_LYCEE } from '@/data/niveauxLycee';

// Distribution simulée : moyenne, écart-type et effectif approximatifs par filière
// (à remplacer par les vraies données crowdsourcées une fois le backend branché)
export const DISTRIBUTION = {
  MPSI: { moyenne: 11.5, ecartType: 2.3, effectif: 15000 },
  MP2I: { moyenne: 11.6, ecartType: 2.3, effectif: 4000 },
  PCSI: { moyenne: 11.2, ecartType: 2.1, effectif: 13500 },
  PTSI: { moyenne: 11.0, ecartType: 2.1, effectif: 3200 },
  TB: { moyenne: 11.3, ecartType: 2.0, effectif: 1500 },
  MP: { moyenne: 11.4, ecartType: 2.4, effectif: 9500 },
  MPI: { moyenne: 11.7, ecartType: 2.3, effectif: 3500 },
  PC: { moyenne: 11.1, ecartType: 2.2, effectif: 8700 },
  PSI: { moyenne: 11.0, ecartType: 2.1, effectif: 8200 },
  PT: { moyenne: 10.9, ecartType: 2.0, effectif: 3000 },
  BCPST: { moyenne: 11.4, ecartType: 2.0, effectif: 6200 },
  TSI: { moyenne: 10.8, ecartType: 2.0, effectif: 2200 },
  TPC: { moyenne: 10.9, ecartType: 1.9, effectif: 900 },
  ECG: { moyenne: 11.8, ecartType: 2.5, effectif: 12500 },
  ECT: { moyenne: 11.5, ecartType: 2.3, effectif: 3800 },
};
export const DISTRIBUTION_DEFAUT = { moyenne: 11.3, ecartType: 2.2, effectif: 5000 };

// Approximation de la fonction de répartition d'une loi normale (erf)
function cdfNormale(x, moyenne, ecartType) {
  const z = (x - moyenne) / (ecartType * Math.SQRT2);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  const erf = z >= 0 ? y : -y;
  return 0.5 * (1 + erf);
}

/**
 * Calcule le rang national estimé.
 * @returns {{ rangBas: number, rangHaut: number, effectif: number } | null}
 */
export function calculerClassement({ moyenneGenerale, filiere, niveauLycee }) {
  if (moyenneGenerale === null || moyenneGenerale === undefined) return null;

  const dist = DISTRIBUTION[filiere] ?? DISTRIBUTION_DEFAUT;
  const niveau = NIVEAUX_LYCEE[niveauLycee] ?? NIVEAUX_LYCEE.standard;
  const moyenneAjustee = moyenneGenerale + niveau.ajustement;

  const percentile = cdfNormale(moyenneAjustee, dist.moyenne, dist.ecartType);
  const rangEstime = Math.max(1, Math.round(dist.effectif * (1 - percentile)));

  return {
    rangBas: Math.round(rangEstime * 0.75),
    rangHaut: Math.round(rangEstime * 1.25),
    effectif: dist.effectif,
  };
}