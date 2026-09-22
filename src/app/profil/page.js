// Fichier : src/app/profil/page.js
'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { FILIERES, FILIERES_LISTE } from '@/data/filieres';
import { NIVEAUX_LYCEE, NIVEAUX_LYCEE_LISTE } from '@/data/niveauxLycee';

export default function ProfilPage() {
  const { profil, setProfil, pret } = useProfile();
  const [form, setForm] = useState(profil);
  const [enregistre, setEnregistre] = useState(false);

  // Une fois le profil chargé depuis localStorage, on synchronise le formulaire
  useEffect(() => {
    if (pret) setForm(profil);
  }, [pret]); // eslint-disable-line react-hooks/exhaustive-deps

  function enregistrer(e) {
    e.preventDefault();
    setProfil(form);
    setEnregistre(true);
    setTimeout(() => setEnregistre(false), 2000);
  }

  const initiales = (form.prenom || form.nom)
    ? `${form.prenom[0] ?? ''}${form.nom[0] ?? ''}`.toUpperCase()
    : '👤';

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="font-heading text-3xl font-extrabold text-ink mb-2">Mon profil</h1>
        <p className="text-ink-soft mb-8">
          Ta filière ici détermine les coefficients utilisés dans tout le site (notes, calculateur, outils premium).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6">

          <form onSubmit={enregistrer} className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink-soft">Prénom</label>
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
                <label className="text-xs font-bold text-ink-soft">Filière</label>
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

            <div>
              <label className="text-xs font-bold text-ink-soft">Niveau de sélectivité du lycée</label>
              <select value={form.niveauLycee}
                onChange={(e) => setForm({ ...form, niveauLycee: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft">
                {NIVEAUX_LYCEE_LISTE.map((n) => (
                  <option key={n} value={n}>{NIVEAUX_LYCEE[n].label}</option>
                ))}
              </select>
              <p className="text-xs text-ink-soft mt-1">Utilisé pour affiner ton classement national estimé (les notations diffèrent d'un lycée à l'autre).</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-ink-soft">Ville</label>
                <input type="text" value={form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
              </div>
              <div>
                <label className="text-xs font-bold text-ink-soft">Objectif de moyenne (facultatif)</label>
                <input type="number" step="0.1" min="0" max="20" placeholder="ex : 14" value={form.objectifMoyenne}
                  onChange={(e) => setForm({ ...form, objectifMoyenne: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-sky-soft" />
              </div>
            </div>

            <button type="submit" className="w-full bg-sky hover:bg-sky-deep text-white font-bold py-3 rounded-xl transition-colors">
              {enregistre ? 'Enregistré ✓' : 'Enregistrer mon profil'}
            </button>
          </form>

          {/* Aperçu carte profil */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky to-violet text-white text-center h-fit">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 grid place-items-center font-heading text-2xl font-bold">
              {initiales}
            </div>
            <p className="font-heading font-bold mt-3">{form.prenom || 'Prénom'} {form.nom || 'Nom'}</p>
            <p className="text-white/80 text-sm mt-1">{form.classe || 'Classe'} · {FILIERES[form.filiere]?.label}</p>
            <p className="text-white/70 text-sm mt-1">{form.etablissement || 'Établissement'}</p>
            <p className="text-white/70 text-sm">{form.ville || 'Ville'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}