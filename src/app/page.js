// Fichier : src/app/page.js
'use client';

import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import EvolutionChart from '@/components/EvolutionChart';
import Clouds from '@/components/decor/Clouds';
import PremiumGate from '@/components/PremiumGate';
import { useProfile } from '@/context/ProfileContext';
import { useNotes } from '@/context/NotesContext';
import { usePlanning } from '@/context/PlanningContext';
import { FILIERES } from '@/data/filieres';
import { calculerClassement } from '@/lib/classement';

const APERCUS_PREMIUM = [
  { href: '/premium/probabilites', titre: "Proba. d'admissibilité", valeur: '68 %', sousTitre: 'Mines Saint-Étienne', accent: 'coral' },
  { href: '/premium/analyses', titre: 'Analyses avancées', valeur: '5 matières', sousTitre: 'Forces / faiblesses', accent: 'amber' },
  { href: '/premium/objectifs', titre: 'Objectif concours', valeur: '14.2 / 20', sousTitre: 'Moyenne à viser aux écrits', accent: 'mint' },
];

const MOIS_LABEL = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

function evolutionParMois(notes) {
  const parMois = {};
  notes.forEach((n) => {
    const d = new Date(n.date);
    const cle = `${d.getFullYear()}-${d.getMonth()}`;
    if (!parMois[cle]) parMois[cle] = { annee: d.getFullYear(), mois: d.getMonth(), totalCoef: 0, totalPoints: 0 };
    parMois[cle].totalCoef += n.coef;
    parMois[cle].totalPoints += n.note * n.coef;
  });
  return Object.values(parMois)
    .sort((a, b) => a.annee - b.annee || a.mois - b.mois)
    .map((m) => ({ mois: MOIS_LABEL[m.mois], moyenne: +(m.totalPoints / m.totalCoef).toFixed(2) }));
}

export default function Home() {
  const { profil } = useProfile();
  const { notes, moyenneGenerale } = useNotes();
  const { taches } = usePlanning();

  const tachesRestantes = taches.filter((t) => t.colonne !== 'done').length;
  const evolution = evolutionParMois(notes);
  const classement = calculerClassement({ moyenneGenerale, filiere: profil.filiere, niveauLycee: profil.niveauLycee });

  return (
    <main className="min-h-screen bg-background p-8">

      <div className="max-w-7xl mx-auto">

        {/* Bandeau de bienvenue, dégradé dynamique avec nuages décoratifs */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky via-sky to-violet p-8 mb-8 text-white">
          <Clouds />
          <div className="relative">
            <h1 className="font-heading text-3xl font-extrabold">
              Bonjour{profil.prenom ? `, ${profil.prenom}` : ''} 👋
            </h1>
            <p className="text-white/85 mt-2">
              {profil.classe || profil.etablissement
                ? `${profil.classe || FILIERES[profil.filiere].label}${profil.etablissement ? ' · ' + profil.etablissement : ''} — voici ton résumé de la semaine.`
                : 'Voici ton résumé pour la semaine en cours.'}
            </p>
          </div>
        </div>

        {/* Grille de cartes gratuites, avec de vraies données */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <Link href="/notes">
            <DashboardCard
              titre="Moyenne générale"
              valeur={moyenneGenerale ? `${moyenneGenerale.toFixed(2)} / 20` : '—'}
              sousTitre={`Sur ${notes.length} évaluation${notes.length > 1 ? 's' : ''} enregistrée${notes.length > 1 ? 's' : ''}`}
              accent="sky"
            />
          </Link>

          <Link href="/planning">
            <DashboardCard
              titre="Prochain DS"
              valeur="Physique"
              sousTitre="Samedi 24 - Électromagnétisme"
              accent="coral"
            />
          </Link>

          <Link href="/planning">
            <DashboardCard
              titre="Fiches à réviser"
              valeur={tachesRestantes}
              sousTitre="À faire ou en cours, voir le planning"
              accent="mint"
            />
          </Link>

          <PremiumGate compact titre="Classement national">
            <Link href="/premium/classement">
              <DashboardCard
                titre="Classement national"
                valeur={classement ? `${classement.rangBas} — ${classement.rangHaut}ᵉ` : '—'}
                sousTitre={classement ? `Sur ~${classement.effectif.toLocaleString('fr-FR')} élèves` : 'Ajoute des notes'}
                accent="violet"
              />
            </Link>
          </PremiumGate>

        </div>

        <div className="grid grid-cols-1 gap-6 mb-12">
          <EvolutionChart data={evolution} />
        </div>

        {/* Section Premium : visible par tous, floutée tant que non débloquée */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl font-bold text-ink">Outils Premium ⭐</h2>
          <Link href="/premium" className="text-sky-deep font-semibold hover:underline">Voir l'offre →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {APERCUS_PREMIUM.map((a) => (
            <PremiumGate key={a.href} compact titre={a.titre}>
              <Link href={a.href}>
                <DashboardCard titre={a.titre} valeur={a.valeur} sousTitre={a.sousTitre} accent={a.accent} />
              </Link>
            </PremiumGate>
          ))}
        </div>

      </div>
    </main>
  );
}