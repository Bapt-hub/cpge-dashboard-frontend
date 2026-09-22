// Fichier : src/data/filieres.js
//
// Liste des voies CPGE : source Ministère de l'Enseignement supérieur
// (enseignementsup-recherche.gouv.fr/fr/classes-preparatoires-aux-grandes-ecoles-cpge)
// → 8 voies de 1ère année : MPSI, MP2I, PCSI, PTSI, BCPST, TSI, TPC, TB
// → 9 voies de 2e année : MP, MPI, PC, PSI, PT, BCPST, TSI, TPC, TB
// + ECG et ECT (voie économique et commerciale).
//
// IMPORTANT — les coefficients d'un concours ne sont pas les coefficients internes
// d'un lycée : chaque prépa fixe ses propres pondérations de DS. Les valeurs ci-dessous
// reprennent donc, à titre de référence par défaut, les grilles des banques d'épreuves
// officielles (identiques pour toutes les écoles d'une même banque, sauf mention contraire) :
//   - MP / PC / PSI / MPI / TSI / TPC / PT : Concours Communs INP (CCINP), session 2026
//     (concours-commun-inp.fr — banque « de sécurité » commune à la quasi-totalité des taupins)
//   - BCPST : Banque d'épreuves Agro-Véto, notice officielle 2026 (concours-agro-veto.fr)
//   - ECG / ECT : Banque Commune d'Épreuves (BCE), moyenne indicative 2026 — les coefficients
//     réels varient fortement d'une école à l'autre (ex. HGG/ESH de 5 à 8 selon l'école visée)
//   - MPSI / MP2I / PCSI / PTSI / TB : pas de concours en 1ère année ; grille dérivée de la
//     filière de 2e année majoritairement visée, à ajuster selon les coefficients internes
//     réels de chaque lycée.
// Ces chiffres sont donc un point de départ réaliste, pas une vérité universelle : chaque
// utilisateur peut/doit les ajuster à sa propre prépa depuis son profil si besoin.

export const FILIERES = {
  // ─── 1ère année (sup) ───────────────────────────────────────────────
  MPSI: {
    label: 'MPSI',
    categorie: 'Scientifique (1ère année)',
    matieres: [
      { nom: 'Mathématiques', coef: 8 },
      { nom: 'Physique-Chimie', coef: 5 },
      { nom: 'Sciences Industrielles', coef: 3 },
      { nom: 'Informatique', coef: 2 },
      { nom: 'Français-Philosophie', coef: 3 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },
  MP2I: {
    label: 'MP2I',
    categorie: 'Scientifique (1ère année)',
    matieres: [
      { nom: 'Mathématiques', coef: 7 },
      { nom: 'Informatique', coef: 6 },
      { nom: 'Physique-Chimie', coef: 4 },
      { nom: 'Français-Philosophie', coef: 3 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },
  PCSI: {
    label: 'PCSI',
    categorie: 'Scientifique (1ère année)',
    matieres: [
      { nom: 'Mathématiques', coef: 5 },
      { nom: 'Physique', coef: 6 },
      { nom: 'Chimie', coef: 5 },
      { nom: 'Sciences Industrielles', coef: 2 },
      { nom: 'Français-Philosophie', coef: 3 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },
  PTSI: {
    label: 'PTSI',
    categorie: 'Scientifique (1ère année)',
    matieres: [
      { nom: 'Mathématiques', coef: 5 },
      { nom: 'Physique-Chimie', coef: 5 },
      { nom: 'Sciences Industrielles', coef: 6 },
      { nom: 'Français-Philosophie', coef: 2 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },
  TB: {
    label: 'TB',
    categorie: 'Technologique (biologie)',
    matieres: [
      { nom: 'Biologie-Biogéosciences', coef: 14 },
      { nom: 'SVT', coef: 10 },
      { nom: 'Physique-Chimie', coef: 10 },
      { nom: 'Mathématiques', coef: 8 },
      { nom: 'Humanités', coef: 6 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },

  // ─── 2e année (spé) ─────────────────────────────────────────────────
  MP: {
    label: 'MP',
    categorie: 'Scientifique (2e année)',
    matieres: [
      { nom: 'Mathématiques 1', coef: 12 },
      { nom: 'Mathématiques 2', coef: 12 },
      { nom: 'Physique', coef: 7 },
      { nom: 'Physique-Chimie / Modélisation', coef: 7 },
      { nom: 'Informatique / SI', coef: 7 },
      { nom: 'Français-Philosophie', coef: 9 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },
  MPI: {
    label: 'MPI',
    categorie: 'Scientifique (2e année)',
    matieres: [
      { nom: 'Mathématiques 1', coef: 10 },
      { nom: 'Mathématiques 2', coef: 10 },
      { nom: 'Physique', coef: 7 },
      { nom: 'Informatique', coef: 12 },
      { nom: 'Français-Philosophie', coef: 9 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },
  PC: {
    label: 'PC',
    categorie: 'Scientifique (2e année)',
    matieres: [
      { nom: 'Mathématiques 1', coef: 10 },
      { nom: 'Mathématiques 2', coef: 10 },
      { nom: 'Physique', coef: 13 },
      { nom: 'Chimie / Modélisation', coef: 14 },
      { nom: 'Français-Philosophie', coef: 9 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },
  PSI: {
    label: 'PSI',
    categorie: 'Scientifique (2e année)',
    matieres: [
      { nom: 'Mathématiques 1', coef: 9 },
      { nom: 'Mathématiques 2', coef: 9 },
      { nom: 'Physique', coef: 8 },
      { nom: 'Sciences Industrielles (S2I)', coef: 12 },
      { nom: 'Français-Philosophie', coef: 9 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },
  PT: {
    label: 'PT',
    categorie: 'Scientifique (2e année)',
    matieres: [
      { nom: 'Mathématiques', coef: 9 },
      { nom: 'Physique', coef: 7 },
      { nom: 'Sciences Industrielles', coef: 12 },
      { nom: 'Français-Philosophie', coef: 6 },
      { nom: 'Anglais LV1', coef: 4 },
    ],
  },
  BCPST: {
    label: 'BCPST',
    categorie: 'Biologie / Agro-Véto',
    matieres: [
      { nom: 'Biologie-Biogéosciences', coef: 18 },
      { nom: 'SVT', coef: 14 },
      { nom: 'Modélisation Maths-Info', coef: 8 },
      { nom: 'Méthodes de calcul', coef: 7 },
      { nom: 'Physique', coef: 8 },
      { nom: 'Chimie', coef: 8 },
      { nom: 'Humanités', coef: 8 },
      { nom: 'Anglais LV1', coef: 6 },
    ],
  },
  TSI: {
    label: 'TSI',
    categorie: 'Technologique (industriel)',
    matieres: [
      { nom: 'Mathématiques', coef: 7 },
      { nom: 'Physique-Chimie', coef: 6 },
      { nom: 'Sciences Industrielles', coef: 6 },
      { nom: 'Français-Philosophie', coef: 3 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },
  TPC: {
    label: 'TPC',
    categorie: 'Technologique (physique-chimie)',
    matieres: [
      { nom: 'Physique', coef: 6 },
      { nom: 'Chimie', coef: 6 },
      { nom: 'Mathématiques', coef: 5 },
      { nom: 'Technologie', coef: 3 },
      { nom: 'Français-Philosophie', coef: 2 },
      { nom: 'Anglais LV1', coef: 2 },
    ],
  },

  // ─── Économique et commerciale ──────────────────────────────────────
  ECG: {
    label: 'ECG',
    categorie: 'Économique et commerciale',
    matieres: [
      { nom: 'Mathématiques Approfondies', coef: 9 },
      { nom: 'ESH / HGGMC', coef: 6 },
      { nom: 'Culture Générale', coef: 6 },
      { nom: 'Anglais LV1', coef: 5 },
      { nom: 'LV2', coef: 4 },
    ],
  },
  ECT: {
    label: 'ECT',
    categorie: 'Économique et commerciale (techno)',
    matieres: [
      { nom: 'Mathématiques', coef: 6 },
      { nom: 'Économie-Droit', coef: 8 },
      { nom: 'Management', coef: 8 },
      { nom: 'Culture Générale', coef: 5 },
      { nom: 'Anglais LV1', coef: 5 },
      { nom: 'LV2', coef: 3 },
    ],
  },
};

export const FILIERES_LISTE = Object.keys(FILIERES);

// Correspondance filière de 1ère année → filière(s) de 2e année qu'elle prépare majoritairement.
// Utilisé pour filtrer l'annuaire SCEI même pour un élève de sup qui n'a pas encore choisi sa spé.
export const FILIERES_VISEES = {
  MPSI: ['MP', 'MPI'],
  MP2I: ['MPI', 'MP'],
  PCSI: ['PC', 'PSI'],
  PTSI: ['PT'],
  BCPST: ['BCPST'],
  TSI: ['TSI'],
  TPC: ['TPC'],
  TB: ['TB'],
  MP: ['MP'],
  MPI: ['MPI'],
  PC: ['PC'],
  PSI: ['PSI'],
  PT: ['PT'],
  ECG: ['ECG'],
  ECT: ['ECT'],
};