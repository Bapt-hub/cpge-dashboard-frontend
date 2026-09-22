// Fichier : src/data/niveauxLycee.js
//
// Pondération indicative : à moyenne affichée égale, un élève d'un lycée très sélectif
// (où les notations sont réputées plus sévères pour un niveau donné) est estimé à un
// niveau national plus élevé que le même chiffre obtenu dans un lycée standard.
// Ajustement volontairement modeste (0 à 1.5 pt/20) : il ne doit jamais remplacer une
// vraie comparaison basée sur des données réelles, seulement l'affiner un peu.

export const NIVEAUX_LYCEE = {
  standard: { label: 'Lycée standard', ajustement: 0 },
  selectif: { label: 'Lycée sélectif', ajustement: 0.7 },
  tres_selectif: { label: 'Lycée très sélectif (parisien, grand centre...)', ajustement: 1.5 },
};

export const NIVEAUX_LYCEE_LISTE = Object.keys(NIVEAUX_LYCEE);