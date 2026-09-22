// Fichier : src/app/planning/page.js
'use client';

import { useState } from 'react';
import { usePlanning, COLONNES } from '@/context/PlanningContext';

const STYLE_COLONNE = {
  todo: { fond: 'bg-sky-soft/50 border-sky-soft', titre: 'text-sky-deep', bouton: 'bg-sky-soft text-sky-deep' },
  doing: { fond: 'bg-amber-soft/50 border-amber-soft', titre: 'text-amber', bouton: 'bg-amber-soft text-amber' },
  done: { fond: 'bg-mint-soft/50 border-mint-soft', titre: 'text-mint', bouton: 'bg-mint-soft text-mint' },
};

function joursRestants(dateStr) {
  return Math.ceil((new Date(dateStr) - new Date('2026-09-20')) / 86400000);
}

export default function PlanningPage() {
  const {
    taches, deplacerTache, ajouterTache, supprimerTache,
    controles, ajouterControle, modifierControle, supprimerControle,
  } = usePlanning();

  const [nouvelleTache, setNouvelleTache] = useState('');
  const [nouveauControle, setNouveauControle] = useState({ matiere: '', sujet: '', date: '' });
  const [enEdition, setEnEdition] = useState(null); // id du contrôle en cours d'édition de date

  function soumettreTache(e) {
    e.preventDefault();
    ajouterTache(nouvelleTache);
    setNouvelleTache('');
  }

  function soumettreControle(e) {
    e.preventDefault();
    ajouterControle(nouveauControle);
    setNouveauControle({ matiere: '', sujet: '', date: '' });
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="font-heading text-3xl font-extrabold text-ink mb-8">Agenda & planning de révision</h1>

        {/* Agenda des contrôles à venir, éditable */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-heading text-xl font-bold text-ink">Contrôles à venir</h2>
        </div>

        <form onSubmit={soumettreControle} className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] mb-6">
          <input
            type="text" placeholder="Matière" required
            value={nouveauControle.matiere}
            onChange={(e) => setNouveauControle({ ...nouveauControle, matiere: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft text-sm"
          />
          <input
            type="text" placeholder="Sujet (facultatif)"
            value={nouveauControle.sujet}
            onChange={(e) => setNouveauControle({ ...nouveauControle, sujet: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft text-sm"
          />
          <input
            type="date" required
            value={nouveauControle.date}
            onChange={(e) => setNouveauControle({ ...nouveauControle, date: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft text-sm"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-coral text-white text-sm font-bold hover:brightness-105 transition-all">
            + Ajouter un contrôle
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {controles.map((ds) => (
            <div key={ds.id} className="p-5 rounded-3xl bg-white border-l-4 border-coral border-y border-r border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm font-bold text-coral">{ds.matiere}</p>
                <button onClick={() => supprimerControle(ds.id)} className="text-ink-soft hover:text-rose-500 text-xs" title="Supprimer">✕</button>
              </div>
              {ds.sujet && <p className="font-heading font-bold text-ink mt-1">{ds.sujet}</p>}

              {enEdition === ds.id ? (
                <input
                  type="date"
                  autoFocus
                  value={ds.date}
                  onChange={(e) => modifierControle(ds.id, { date: e.target.value })}
                  onBlur={() => setEnEdition(null)}
                  className="mt-2 px-2 py-1 rounded-lg border border-sky-soft text-sm w-full"
                />
              ) : (
                <button onClick={() => setEnEdition(ds.id)} className="text-ink-soft text-sm mt-2 hover:text-coral transition-colors">
                  {ds.date} · dans {joursRestants(ds.date)} j <span className="text-xs underline">(modifier)</span>
                </button>
              )}
            </div>
          ))}
          {controles.length === 0 && (
            <p className="text-ink-soft text-sm sm:col-span-3">Aucun contrôle programmé — ajoute-en un ci-dessus.</p>
          )}
        </div>

        {/* Kanban de révision */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="font-heading text-xl font-bold text-ink">Suivi des fiches</h2>
          <form onSubmit={soumettreTache} className="flex gap-2">
            <input
              type="text" placeholder="Nouvelle fiche à réviser..."
              value={nouvelleTache}
              onChange={(e) => setNouvelleTache(e.target.value)}
              className="px-3 py-2 rounded-full border border-sky-soft text-sm"
            />
            <button type="submit" className="px-4 py-2 rounded-full bg-sky text-white text-sm font-bold hover:bg-sky-deep transition-colors">
              + Ajouter
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLONNES.map((col) => {
            const style = STYLE_COLONNE[col.id] ?? STYLE_COLONNE.todo;
            return (
              <div key={col.id} className={`p-4 rounded-3xl border min-h-[220px] ${style.fond}`}>
                <h3 className={`font-bold mb-3 ${style.titre}`}>{col.label} · {taches.filter((t) => t.colonne === col.id).length}</h3>
                <div className="space-y-3">
                  {taches.filter((t) => t.colonne === col.id).map((t) => (
                    <div key={t.id} className="p-3 rounded-2xl bg-white border border-sky-soft shadow-sm flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-ink">{t.titre}</span>
                      <div className="flex gap-1 items-center">
                        <button onClick={() => deplacerTache(t.id, -1)} className={`w-6 h-6 rounded-full text-xs font-bold ${style.bouton}`}>←</button>
                        <button onClick={() => deplacerTache(t.id, 1)} className={`w-6 h-6 rounded-full text-xs font-bold ${style.bouton}`}>→</button>
                        <button onClick={() => supprimerTache(t.id)} className="text-ink-soft hover:text-rose-500 text-xs ml-1">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}