// Fichier : src/data/scei.js
// Données d'exemple - à remplacer par un import réel des archives SCEI (banques d'épreuves).
// `filieres` référence les clés de FILIERES (src/data/filieres.js) pour permettre le filtrage
// par filière de profil.

export const SCEI_ECOLES = [
  { ecole: 'Mines Paris - PSL', filieres: ['MP', 'MPI'], anneeRef: 2025, seuilAdmissibilite: 15.8, rangDernierAdmis: 45 },
  { ecole: 'Centrale Paris', filieres: ['MP', 'MPI', 'PC', 'PSI'], anneeRef: 2025, seuilAdmissibilite: 15.2, rangDernierAdmis: 120 },
  { ecole: 'Mines Saint-Étienne', filieres: ['PC', 'PSI'], anneeRef: 2025, seuilAdmissibilite: 12.4, rangDernierAdmis: 980 },
  { ecole: 'ENSTA Paris', filieres: ['MP', 'MPI', 'PT'], anneeRef: 2025, seuilAdmissibilite: 13.6, rangDernierAdmis: 610 },
  { ecole: 'Arts et Métiers', filieres: ['PT', 'TSI'], anneeRef: 2025, seuilAdmissibilite: 11.5, rangDernierAdmis: 1450 },
  { ecole: 'INSA Lyon', filieres: ['MP', 'PC', 'PSI', 'TSI', 'TPC'], anneeRef: 2025, seuilAdmissibilite: 11.8, rangDernierAdmis: 1600 },
  { ecole: 'HEC Paris', filieres: ['ECG'], anneeRef: 2025, seuilAdmissibilite: 14.9, rangDernierAdmis: 380 },
  { ecole: 'ESSEC', filieres: ['ECG', 'ECT'], anneeRef: 2025, seuilAdmissibilite: 13.8, rangDernierAdmis: 720 },
  { ecole: 'EM Lyon', filieres: ['ECG', 'ECT'], anneeRef: 2025, seuilAdmissibilite: 12.5, rangDernierAdmis: 1100 },
  { ecole: 'AgroParisTech', filieres: ['BCPST'], anneeRef: 2025, seuilAdmissibilite: 13.1, rangDernierAdmis: 210 },
  { ecole: 'VetAgro Sup', filieres: ['BCPST', 'TB'], anneeRef: 2025, seuilAdmissibilite: 12.0, rangDernierAdmis: 540 },
  { ecole: 'ENSAIA', filieres: ['BCPST', 'TB'], anneeRef: 2025, seuilAdmissibilite: 10.8, rangDernierAdmis: 1200 },
];