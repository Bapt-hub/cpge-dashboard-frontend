// Fichier : src/app/premium/classement/page.js
'use client';

import Link from 'next/link';
import { FILIERES } from '@/data/filieres';
import { NIVEAUX_LYCEE } from '@/data/niveauxLycee';
import { DISTRIBUTION, DISTRIBUTION_DEFAUT, calculerClassement } from '@/lib/classement';
import PremiumGate from '@/components/PremiumGate';
import { useProfile } from '@/context/ProfileContext';
import { useNotes } from '@/context/NotesContext';

export default function ClassementPage() {
  const { profil } = useProfile();
  const { moyenneGenerale } = useNotes();

  const filiere = profil.filiere;
  const dist = DISTRIBUTION[filiere] ?? DISTRIBUTION_DEFAUT;
  const niveau = NIVEAUX_LYCEE[profil.niveauLycee] ?? NIVEAUX_LYCEE.standard;

  const resultat = calculerClassement({ moyenneGenerale, filiere, niveauLycee: profil.niveauLycee });

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-soft text-amber font-bold text-sm mb-3">Premium ⭐</span>
          <h1 className="font-heading text-3xl font-extrabold text-ink">Classement national estimé</h1>
          <p className="text-ink-soft mt-1">
            Comparaison crowdsourcée avec les {dist.effectif.toLocaleString('fr-FR')} élèves de {FILIERES[filiere]?.label ?? filiere} utilisant PrépaDash.
          </p>
        </div>

        <PremiumGate titre="Débloque le classement national estimé">
        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-4 py-2 rounded-full bg-sky text-white font-bold">{FILIERES[filiere]?.label ?? filiere}</span>
            <span className="px-4 py-2 rounded-full bg-sky-soft text-ink-soft font-semibold">{niveau.label}</span>
            <Link href="/profil" className="px-4 py-2 rounded-full border border-sky-soft text-ink-soft font-semibold hover:text-sky-deep hover:border-sky transition-colors">
              Modifier depuis mon profil
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-sky-soft/50 text-center">
            <p className="text-xs font-bold text-ink-soft">Ta moyenne générale (issue de tes notes enregistrées)</p>
            <p className="font-heading text-2xl font-extrabold text-sky-deep mt-1">
              {moyenneGenerale !== null ? `${moyenneGenerale.toFixed(2)} / 20` : 'Aucune note enregistrée'}
            </p>
            {moyenneGenerale === null && (
              <p className="text-ink-soft text-xs mt-1">
                <Link href="/notes" className="underline hover:text-sky-deep">Ajoute des notes</Link> pour obtenir ton classement.
              </p>
            )}
          </div>
        </div>

        {resultat && (
          <div className="mt-6 p-6 rounded-3xl bg-amber-soft border-2 border-amber text-center">
            <p className="text-sm font-bold text-ink-soft">Rang national estimé</p>
            <p className="font-heading text-4xl font-extrabold text-ink mt-1">{resultat.rangBas} — {resultat.rangHaut}ᵉ</p>
            <p className="text-ink-soft text-sm mt-2">sur environ {resultat.effectif.toLocaleString('fr-FR')} élèves de ta filière</p>
          </div>
        )}
        </PremiumGate>

        <p className="text-xs text-ink-soft mt-4 text-center">
          Estimation basée sur les moyennes déclarées par les utilisateurs Premium, ajustée selon le niveau de ton lycée. Plus la communauté grandit, plus elle est précise.
        </p>
      </div>
    </main>
  );
}