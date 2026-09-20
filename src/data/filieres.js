// Fichier : src/data/filieres.js
// Coefficients à titre d'exemple : à ajuster selon les concours réellement visés
// (les coefficients officiels varient selon la banque d'épreuves - Mines-Ponts, CCINP, e3a, etc.)

export const FILIERES = {
  MPSI: {
    label: 'MPSI',
    matieres: [
      { nom: 'Mathématiques', coef: 6 },
      { nom: 'Physique', coef: 5 },
      { nom: 'Sciences Industrielles', coef: 3 },
      { nom: 'Français-Philo', coef: 2 },
      { nom: 'Anglais', coef: 2 },
      { nom: 'TIPE', coef: 1 },
    ],
  },
  PCSI: {
    label: 'PCSI',
    matieres: [
      { nom: 'Mathématiques', coef: 5 },
      { nom: 'Physique-Chimie', coef: 6 },
      { nom: 'Sciences Industrielles', coef: 2 },
      { nom: 'Français-Philo', coef: 2 },
      { nom: 'Anglais', coef: 2 },
      { nom: 'TIPE', coef: 1 },
    ],
  },
  ECG: {
    label: 'ECG',
    matieres: [
      { nom: 'Mathématiques', coef: 6 },
      { nom: 'ESH / Géopolitique', coef: 5 },
      { nom: 'Économie', coef: 3 },
      { nom: 'Français-Philo', coef: 2 },
      { nom: 'Anglais LV1', coef: 3 },
      { nom: 'LV2', coef: 2 },
    ],
  },
  BCPST: {
    label: 'BCPST',
    matieres: [
      { nom: 'Biologie-Géologie', coef: 6 },
      { nom: 'Mathématiques', coef: 4 },
      { nom: 'Physique-Chimie', coef: 4 },
      { nom: 'Français-Philo', coef: 2 },
      { nom: 'Anglais', coef: 2 },
      { nom: 'Géographie', coef: 2 },
    ],
  },
};

export const FILIERES_LISTE = Object.keys(FILIERES);