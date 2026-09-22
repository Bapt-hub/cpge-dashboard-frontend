// Fichier : src/app/premium/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Clouds from '@/components/decor/Clouds';
import { usePremium } from '@/context/PremiumContext';
import { useReferral } from '@/context/ReferralContext';
import { useProfile } from '@/context/ProfileContext';

export default function PremiumPage() {
  const { isPremium, activerPremium, desactiverPremium, pret } = usePremium();
  const { profil } = useProfile();
  const { monCode, filleuls, codeUtilise, moisOffertsGagnes, pret: parrainagePret, initialiserCode, appliquerCodeParrain, simulerFilleul } = useReferral();
  const [periode, setPeriode] = useState('mensuel'); // 'mensuel' | 'annuel'
  const [codeSaisi, setCodeSaisi] = useState('');
  const [copie, setCopie] = useState(false);

  if (parrainagePret && !monCode) initialiserCode(profil.prenom);

  function copierCode() {
    if (!monCode) return;
    navigator.clipboard?.writeText(monCode);
    setCopie(true);
    setTimeout(() => setCopie(false), 1500);
  }

  function soumettreCode(e) {
    e.preventDefault();
    appliquerCodeParrain(codeSaisi);
    setCodeSaisi('');
  }

  const progressionFilleuls = Math.min(100, ((filleuls.length % 2) / 2) * 100);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky via-sky to-violet p-10 mb-10 text-center text-white">
          <Clouds />
          <div className="relative">
            <h1 className="font-heading text-4xl font-extrabold mb-4">Passe à la vitesse supérieure</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Débloque la puissance des algorithmes pour estimer tes chances aux concours et comparer tes performances au niveau national.
            </p>
            <p className="text-white/95 text-sm mt-4 font-bold">
              🎁 Invite 2 camarades avec ton code : 1 mois de Premium offert. Voir plus bas ↓
            </p>
          </div>
        </div>

        {/* Comparatif des offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div className="p-8 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
            <h2 className="font-heading text-2xl font-bold text-ink mb-2">Gratuit</h2>
            <p className="text-4xl font-black text-ink mb-6">0€ <span className="text-lg font-normal text-ink-soft">/mois</span></p>
            <ul className="space-y-3 text-ink-soft mb-8">
              <li>✅ Suivi illimité des notes, DS et colles</li>
              <li>✅ Calculateur de moyenne intelligent</li>
              <li>✅ Agenda & kanban de révision</li>
              <li>✅ Annuaire SCEI de base</li>
            </ul>
            {pret && isPremium ? (
              <button onClick={desactiverPremium} className="w-full py-3 rounded-full bg-sky-soft text-ink-soft font-bold hover:bg-sky-soft/70 transition-colors">
                Revenir au plan gratuit
              </button>
            ) : (
              <button disabled className="w-full py-3 rounded-full bg-sky-soft text-ink-soft font-bold cursor-not-allowed">
                Ton plan actuel
              </button>
            )}
          </div>

          <div className="p-8 rounded-3xl bg-amber-soft border-2 border-amber shadow-[0_12px_28px_-10px_rgba(255,176,59,0.45)] relative hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber text-white px-3 py-1 rounded-full text-sm font-bold">
              Le plus populaire
            </div>
            <h2 className="font-heading text-2xl font-bold text-sky-deep mb-4">Premium ⭐</h2>

            {/* Bascule mensuel / annuel */}
            <div className="flex gap-1 p-1 rounded-full bg-white/60 mb-4 w-fit">
              <button
                onClick={() => setPeriode('mensuel')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  periode === 'mensuel'
                    ? 'bg-amber text-white shadow-sm'
                    : 'text-ink-soft hover:scale-105 hover:-translate-y-0.5'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setPeriode('annuel')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  periode === 'annuel'
                    ? 'bg-amber text-white shadow-sm'
                    : 'text-ink-soft hover:scale-105 hover:-translate-y-0.5'
                }`}
              >
                Annuel <span className="text-xs">-33%</span>
              </button>
            </div>

            {periode === 'mensuel' ? (
              <p className="text-4xl font-black text-ink mb-6">4.99€ <span className="text-lg font-normal text-ink-soft">/mois</span></p>
            ) : (
              <div className="mb-6">
                <p className="text-4xl font-black text-ink">39.99€ <span className="text-lg font-normal text-ink-soft">/an</span></p>
                <p className="text-sm text-mint font-bold mt-1">soit 3.33€/mois · 2 mois offerts</p>
              </div>
            )}

            <ul className="space-y-3 text-ink-soft mb-8">
              <li className="font-bold text-ink">🚀 Tout le plan gratuit, plus :</li>
              <li>🚀 Estimation du rang national</li>
              <li>🚀 Probabilité d'admissibilité</li>
              <li>🚀 Analyses graphiques avancées</li>
              <li>🚀 Planificateur d'objectifs de concours</li>
            </ul>
            {pret && isPremium ? (
              <button disabled className="w-full py-3 rounded-full bg-mint text-white font-bold cursor-not-allowed">
                Premium actif ⭐
              </button>
            ) : (
              <button onClick={activerPremium} className="w-full py-3 rounded-full bg-amber text-white font-bold hover:brightness-105 transition-all">
                Débloquer Premium — {periode === 'mensuel' ? '4.99€/mois' : '39.99€/an'}
              </button>
            )}
          </div>

        </div>

        {/* Parrainage */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-soft to-sky-soft border border-sky-soft p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎁</span>
            <h2 className="font-heading text-2xl font-bold text-ink">Parraine 2 amis, gagne 1 mois Premium</h2>
          </div>
          <p className="text-ink-soft mb-6">
            Partage ton code avec tes camarades de prépa. Dès que 2 d'entre eux s'inscrivent avec, ton mois de Premium est offert automatiquement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mon code */}
            <div className="p-5 rounded-2xl bg-white border border-sky-soft">
              <p className="text-xs font-bold text-ink-soft mb-2">Ton code de parrainage</p>
              <div className="flex gap-2">
                <span className="flex-1 px-4 py-2 rounded-xl bg-violet-soft text-violet font-heading font-bold text-center tracking-wide">
                  {monCode ?? '...'}
                </span>
                <button onClick={copierCode} className="px-4 py-2 rounded-xl bg-violet text-white font-bold text-sm hover:brightness-110 transition-all">
                  {copie ? 'Copié ✓' : 'Copier'}
                </button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-ink-soft mb-1">
                  <span>{filleuls.length % 2}/2 filleuls</span>
                  <span>{moisOffertsGagnes} mois gagné{moisOffertsGagnes > 1 ? 's' : ''}</span>
                </div>
                <div className="h-3 rounded-full bg-sky-soft overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet to-sky transition-all" style={{ width: `${progressionFilleuls}%` }} />
                </div>
              </div>

              <button
                onClick={() => simulerFilleul()}
                className="mt-4 text-xs text-ink-soft underline hover:text-violet transition-colors"
              >
                Démo : simuler l'inscription d'un ami avec mon code
              </button>
            </div>

            {/* Code reçu */}
            <div className="p-5 rounded-2xl bg-white border border-sky-soft">
              <p className="text-xs font-bold text-ink-soft mb-2">Tu as un code d'un ami ?</p>
              {codeUtilise ? (
                <p className="text-ink font-semibold">Code appliqué : <span className="text-violet font-bold">{codeUtilise}</span> 🎉</p>
              ) : (
                <form onSubmit={soumettreCode} className="flex gap-2">
                  <input
                    type="text" placeholder="ex : BAPTISTE-4F2K"
                    value={codeSaisi}
                    onChange={(e) => setCodeSaisi(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-sky-soft uppercase text-sm"
                  />
                  <button type="submit" className="px-4 py-2 rounded-xl bg-sky text-white font-bold text-sm hover:bg-sky-deep transition-colors">
                    Valider
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-ink-soft text-center mt-6">
          Démo : le déblocage, le parrainage et les filleuls sont simulés et stockés localement dans ton navigateur — à brancher sur Stripe et une vraie base multi-utilisateurs en production.
        </p>
      </div>
    </main>
  );
}