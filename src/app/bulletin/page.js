// Fichier : src/app/bulletin/page.js
'use client';

import { useProfile } from '@/context/ProfileContext';
import { useNotes } from '@/context/NotesContext';
import { FILIERES } from '@/data/filieres';

export default function BulletinPage() {
  const { profil } = useProfile();
  const { notes, moyenneGenerale, totalCoef } = useNotes();
  const matieresFiliere = FILIERES[profil.filiere].matieres;

  const parMatiere = matieresFiliere.map((m) => {
    const notesMatiere = notes.filter((n) => n.matiere === m.nom);
    const coefTotal = notesMatiere.reduce((s, n) => s + n.coef, 0);
    const moyenne = coefTotal ? notesMatiere.reduce((s, n) => s + n.note * n.coef, 0) / coefTotal : null;
    return { ...m, notes: notesMatiere, moyenne };
  });

  const dateEdition = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">

        <div className="no-print flex justify-between items-center mb-6">
          <h1 className="font-heading text-3xl font-extrabold text-ink">Bulletin</h1>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 rounded-full bg-sky text-white font-bold hover:bg-sky-deep transition-colors"
          >
            🖨️ Imprimer / Exporter en PDF
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">

          {/* En-tête du bulletin */}
          <div className="flex justify-between items-start border-b border-sky-soft pb-6 mb-6">
            <div>
              <p className="font-heading text-xl font-bold text-ink">
                {profil.prenom || 'Prénom'} {profil.nom || 'Nom'}
              </p>
              <p className="text-ink-soft text-sm mt-1">
                {profil.classe || FILIERES[profil.filiere].label} · {FILIERES[profil.filiere].label}
              </p>
              <p className="text-ink-soft text-sm">
                {profil.etablissement || 'Établissement non renseigné'}{profil.ville ? `, ${profil.ville}` : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading text-lg font-bold text-sky-deep">PrépaDash</p>
              <p className="text-ink-soft text-xs mt-1">Édité le {dateEdition}</p>
            </div>
          </div>

          {/* Tableau par matière */}
          <table className="w-full text-left text-ink mb-6">
            <thead className="border-b border-sky-soft">
              <tr>
                <th className="py-2 font-bold text-ink-soft">Matière</th>
                <th className="py-2 font-bold text-ink-soft text-right">Coef</th>
                <th className="py-2 font-bold text-ink-soft text-right">Éval.</th>
                <th className="py-2 font-bold text-ink-soft text-right">Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-soft">
              {parMatiere.map((m) => (
                <tr key={m.nom}>
                  <td className="py-2 font-semibold">{m.nom}</td>
                  <td className="py-2 text-right text-ink-soft">{m.coef}</td>
                  <td className="py-2 text-right text-ink-soft">{m.notes.length}</td>
                  <td className="py-2 text-right font-bold">{m.moyenne !== null ? `${m.moyenne.toFixed(2)} / 20` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Moyenne générale */}
          <div className="p-6 rounded-2xl bg-sky-soft/60 text-center">
            <p className="text-sm font-bold text-ink-soft">Moyenne générale pondérée</p>
            <p className="font-heading text-4xl font-extrabold text-sky-deep mt-1">
              {moyenneGenerale ? `${moyenneGenerale.toFixed(2)} / 20` : '—'}
            </p>
            <p className="text-ink-soft text-xs mt-2">{notes.length} évaluation(s) · {totalCoef} points de coefficient cumulés</p>
          </div>

          {/* Détail des évaluations */}
          <div className="mt-8">
            <h2 className="font-heading font-bold text-ink mb-3">Détail des évaluations</h2>
            <table className="w-full text-left text-sm text-ink">
              <thead className="border-b border-sky-soft">
                <tr>
                  <th className="py-2 font-bold text-ink-soft">Date</th>
                  <th className="py-2 font-bold text-ink-soft">Matière</th>
                  <th className="py-2 font-bold text-ink-soft">Type</th>
                  <th className="py-2 font-bold text-ink-soft text-right">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-soft">
                {notes.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map((n) => (
                  <tr key={n.id}>
                    <td className="py-2">{n.date}</td>
                    <td className="py-2">{n.matiere}</td>
                    <td className="py-2">{n.type}</td>
                    <td className="py-2 text-right font-semibold">{n.note.toFixed(1)} / 20</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}