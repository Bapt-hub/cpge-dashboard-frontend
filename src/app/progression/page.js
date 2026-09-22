// Fichier : src/app/progression/page.js
'use client';

import { useProfile } from '@/context/ProfileContext';
import { useNotes } from '@/context/NotesContext';
import { usePlanning } from '@/context/PlanningContext';
import { useReferral } from '@/context/ReferralContext';

const BORDURES_ROTATION = ['border-sky', 'border-coral', 'border-mint', 'border-violet', 'border-amber'];

function evolutionMensuelle(notes) {
  const parMois = {};
  notes.forEach((n) => {
    const d = new Date(n.date);
    const cle = `${d.getFullYear()}-${d.getMonth()}`;
    if (!parMois[cle]) parMois[cle] = { cle, totalCoef: 0, totalPoints: 0 };
    parMois[cle].totalCoef += n.coef;
    parMois[cle].totalPoints += n.note * n.coef;
  });
  return Object.values(parMois)
    .sort((a, b) => a.cle.localeCompare(b.cle))
    .map((m) => m.totalPoints / m.totalCoef);
}

export default function ProgressionPage() {
  const { profil } = useProfile();
  const { notes, moyenneGenerale } = useNotes();
  const { taches } = usePlanning();
  const { filleuls } = useReferral();

  const matieresCouvertes = new Set(notes.map((n) => n.matiere)).size;
  const tachesTerminees = taches.filter((t) => t.colonne === 'done').length;

  const profilComplet = ['prenom', 'nom', 'classe', 'etablissement', 'ville']
    .every((champ) => (profil[champ] ?? '').toString().trim().length > 0);

  const excellence = moyenneGenerale !== null && moyenneGenerale >= 16;

  const colles = notes.filter((n) => n.type === 'Colle');
  const coefColles = colles.reduce((s, n) => s + n.coef, 0);
  const moyenneColles = coefColles ? colles.reduce((s, n) => s + n.note * n.coef, 0) / coefColles : null;

  const mensuel = evolutionMensuelle(notes);
  const enProgression = mensuel.length >= 2 && mensuel[mensuel.length - 1] > mensuel[mensuel.length - 2];

  const objectif = parseFloat(profil.objectifMoyenne);
  const objectifDefini = !Number.isNaN(objectif) && objectif > 0;
  const objectifAtteint = objectifDefini && moyenneGenerale !== null && moyenneGenerale >= objectif;
  const progressionObjectif = objectifDefini && moyenneGenerale !== null
    ? Math.min(100, Math.round((moyenneGenerale / objectif) * 100))
    : 0;

  const BADGES = [
    { titre: 'Premier pas', desc: 'Ajoute ta première note', debloque: notes.length >= 1, icone: '🌱' },
    { titre: 'Sérieux', desc: 'Enregistre au moins 5 évaluations', debloque: notes.length >= 5, icone: '📚' },
    { titre: 'Toutes matières', desc: 'Au moins 4 matières différentes suivies', debloque: matieresCouvertes >= 4, icone: '🧭' },
    { titre: 'Colle master', desc: 'Moyenne en colles ≥ 14', debloque: moyenneColles !== null && moyenneColles >= 14, icone: '🎤' },
    { titre: 'En hausse', desc: 'Ta moyenne mensuelle progresse', debloque: enProgression, icone: '📈' },
    { titre: 'Productif', desc: 'Au moins 3 fiches terminées dans le planning', debloque: tachesTerminees >= 3, icone: '✅' },
    { titre: 'Objectif atteint', desc: 'Moyenne générale ≥ ton objectif personnel', debloque: objectifAtteint, icone: '🎯' },
    { titre: 'Profil complet', desc: 'Prénom, nom, classe, établissement et ville renseignés', debloque: profilComplet, icone: '🪪' },
    { titre: 'Excellence', desc: 'Moyenne générale ≥ 16', debloque: excellence, icone: '🏅' },
    { titre: 'Parrain', desc: "Au moins un ami inscrit avec ton code de parrainage", debloque: filleuls.length >= 1, icone: '🎁' },
  ];

  const nbDebloques = BADGES.filter((b) => b.debloque).length;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-ink">Progression{profil.prenom ? ` de ${profil.prenom}` : ''}</h1>
          <p className="text-ink-soft mt-1">{nbDebloques} / {BADGES.length} badges débloqués</p>
        </div>

        {/* Objectif personnel */}
        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] mb-8">
          <h2 className="font-heading font-bold text-ink mb-3">Objectif de moyenne</h2>
          {objectifDefini ? (
            <>
              <div className="flex justify-between text-sm text-ink-soft mb-2">
                <span>{moyenneGenerale ? moyenneGenerale.toFixed(2) : '—'} / 20</span>
                <span>Objectif : {objectif} / 20</span>
              </div>
              <div className="h-4 rounded-full bg-sky-soft overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${objectifAtteint ? 'bg-mint' : 'bg-gradient-to-r from-sky to-violet'}`}
                  style={{ width: `${progressionObjectif}%` }}
                />
              </div>
              {objectifAtteint && <p className="text-mint font-bold text-sm mt-2">🎉 Objectif atteint !</p>}
            </>
          ) : (
            <p className="text-ink-soft text-sm">
              Aucun objectif défini. <a href="/profil" className="underline hover:text-sky-deep">Ajoute-en un depuis ton profil</a> pour suivre ta progression.
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BADGES.map((b, i) => {
            const couleurBordure = BORDURES_ROTATION[i % BORDURES_ROTATION.length];
            return (
              <div
                key={b.titre}
                className={`p-5 rounded-3xl border shadow-sm flex items-start gap-4 transition-all ${
                  b.debloque ? `bg-white border-l-4 ${couleurBordure} border-y border-r border-sky-soft` : 'bg-sky-soft/30 border-sky-soft/50 opacity-60'
                }`}
              >
                <span className={`text-3xl ${b.debloque ? '' : 'grayscale'}`}>{b.debloque ? b.icone : '🔒'}</span>
                <div>
                  <p className="font-heading font-bold text-ink">{b.titre}</p>
                  <p className="text-ink-soft text-sm mt-1">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}