// Fichier : src/app/onboarding/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile, PROFIL_DEFAUT } from '@/context/ProfileContext';
import { usePremium } from '@/context/PremiumContext';
import { useReferral } from '@/context/ReferralContext';
import { FILIERES, FILIERES_LISTE } from '@/data/filieres';
import { NIVEAUX_LYCEE, NIVEAUX_LYCEE_LISTE } from '@/data/niveauxLycee';
import Clouds from '@/components/decor/Clouds';

const ETAPES = ['Profil', 'Ton offre', 'Parrainage'];

export default function OnboardingPage() {
  const router = useRouter();
  const { profil, setProfil, pret: profilPret } = useProfile();
  const { activerPremium } = usePremium();
  const { appliquerCodeParrain, initialiserCode } = useReferral();

  const [etape, setEtape] = useState(0);
  const [form, setForm] = useState(PROFIL_DEFAUT);
  const [offreChoisie, setOffreChoisie] = useState('freemium'); // 'freemium' | 'premium'
  const [codeSaisi, setCodeSaisi] = useState('');

  useEffect(() => {
    if (profilPret) setForm(profil);
  }, [profilPret]); // eslint-disable-line react-hooks/exhaustive-deps

  function suivant() {
    setEtape((e) => Math.min(e + 1, ETAPES.length - 1));
  }
  function precedent() {
    setEtape((e) => Math.max(e - 1, 0));
  }

  function terminer() {
    setProfil({ ...form, onboardingTermine: true });
    initialiserCode(form.prenom);
    if (offreChoisie === 'premium') activerPremium();
    if (codeSaisi.trim()) appliquerCodeParrain(codeSaisi);
    router.replace('/');
  }

  const profilValide = form.prenom.trim() && form.filiere;

  return (
    <main className="min-h-screen bg-background p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky via-sky to-violet p-8 mb-6 text-white text-center">
          <Clouds />
          <div className="relative">
            <h1 className="font-heading text-3xl font-extrabold">Bienvenue sur PrépaDash 👋</h1>
            <p className="text-white/85 mt-2">Trois petites étapes avant d'accéder à ton tableau de bord.</p>
          </div>
        </div>

        {/* Indicateur d'étapes */}
        <div className="flex justify-center gap-2 mb-6">
          {ETAPES.map((label, i) => (
            <div key={label} className={`px-4 py-1.5 rounded-full text-sm font-bold ${i === etape ? 'bg-sky text-white' : i < etape ? 'bg-mint-soft text-mint' : 'bg-sky-soft text-ink-soft'}`}>
              {i + 1}. {label}
            </div>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">

          {/* Étape 1 : profil */}
          {etape === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-ink-soft">Prénom *</label>
                  <input type="text" value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink-soft">Nom</label>
                  <input type="text" value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-ink-soft">Classe</label>
                  <input type="text" placeholder="ex : MPSI 1" value={form.classe}
                    onChange={(e) => setForm({ ...form, classe: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink-soft">Filière *</label>
                  <select value={form.filiere}
                    onChange={(e) => setForm({ ...form, filiere: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft">
                    {FILIERES_LISTE.map((f) => (
                      <option key={f} value={f}>{FILIERES[f].label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-ink-soft">Établissement</label>
                <input type="text" placeholder="ex : Lycée Faidherbe" value={form.etablissement}
                  onChange={(e) => setForm({ ...form, etablissement: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-ink-soft">Ville</label>
                  <input type="text" value={form.ville}
                    onChange={(e) => setForm({ ...form, ville: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink-soft">Niveau du lycée</label>
                  <select value={form.niveauLycee}
                    onChange={(e) => setForm({ ...form, niveauLycee: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft">
                    {NIVEAUX_LYCEE_LISTE.map((n) => (
                      <option key={n} value={n}>{NIVEAUX_LYCEE[n].label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Étape 2 : offre */}
          {etape === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setOffreChoisie('freemium')}
                className={`p-5 rounded-3xl border-2 text-left transition-all ${offreChoisie === 'freemium' ? 'border-sky bg-sky-soft/50' : 'border-sky-soft bg-white'}`}
              >
                <p className="font-heading font-bold text-ink mb-1">Gratuit</p>
                <p className="text-ink-soft text-sm">Notes, calculateur, planning, annuaire SCEI. Idéal pour commencer.</p>
              </button>
              <button
                onClick={() => setOffreChoisie('premium')}
                className={`p-5 rounded-3xl border-2 text-left transition-all ${offreChoisie === 'premium' ? 'border-amber bg-amber-soft/50' : 'border-sky-soft bg-white'}`}
              >
                <p className="font-heading font-bold text-ink mb-1">Premium ⭐</p>
                <p className="text-ink-soft text-sm">Classement national, probabilités, analyses, objectifs de concours.</p>
              </button>
              <p className="sm:col-span-2 text-xs text-ink-soft text-center">Tu pourras changer d'avis à tout moment depuis la page Premium.</p>
            </div>
          )}

          {/* Étape 3 : parrainage */}
          {etape === 2 && (
            <div className="space-y-4 text-center">
              <p className="text-ink-soft">Un ami t'a partagé un code ? Ajoute-le ici (facultatif).</p>
              <input
                type="text" placeholder="ex : BAPTISTE-4F2K"
                value={codeSaisi}
                onChange={(e) => setCodeSaisi(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-sky-soft text-center uppercase"
              />
              <p className="text-xs text-ink-soft">
                Toi aussi tu auras ton propre code à partager une fois inscrit — 2 amis inscrits avec ton code = 1 mois Premium offert.
              </p>
            </div>
          )}

        </div>

        <div className="flex justify-between mt-6">
          {etape > 0 ? (
            <button onClick={precedent} className="px-5 py-2 rounded-full border border-sky-soft text-ink-soft font-bold hover:bg-sky-soft/40 transition-colors">
              ← Précédent
            </button>
          ) : <span />}

          {etape < ETAPES.length - 1 ? (
            <button
              onClick={suivant}
              disabled={etape === 0 && !profilValide}
              className="px-6 py-2 rounded-full bg-sky text-white font-bold hover:bg-sky-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          ) : (
            <button onClick={terminer} className="px-6 py-2 rounded-full bg-gradient-to-r from-sky to-violet text-white font-bold hover:brightness-105 transition-all">
              Accéder à PrépaDash 🚀
            </button>
          )}
        </div>
      </div>
    </main>
  );
}