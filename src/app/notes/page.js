// Fichier : src/app/notes/page.js
'use client';

import { useState } from 'react';
import { FILIERES, FILIERES_LISTE } from '@/data/filieres';

export default function NotesPage() {
  const [filiere, setFiliere] = useState('MPSI');
  const matieresFiliere = FILIERES[filiere].matieres;

  const [notes, setNotes] = useState([
    { id: 1, date: '2026-10-24', matiere: 'Physique', type: 'DS', note: 14.5, coef: 5, moyClasse: 11.2 },
    { id: 2, date: '2026-10-18', matiere: 'Mathématiques', type: 'Colle', note: 16.0, coef: 6, moyClasse: null },
  ]);

  const [form, setForm] = useState({
    date: '',
    matiere: matieresFiliere[0].nom,
    type: 'DS',
    note: '',
    moyClasse: '',
  });

  function coefFor(matiereNom) {
    const m = matieresFiliere.find((m) => m.nom === matiereNom);
    return m ? m.coef : 1;
  }

  function ajouterNote(e) {
    e.preventDefault();
    if (!form.date || form.note === '') return;
    setNotes([
      {
        id: Date.now(),
        date: form.date,
        matiere: form.matiere,
        type: form.type,
        note: parseFloat(form.note),
        coef: coefFor(form.matiere),
        moyClasse: form.moyClasse ? parseFloat(form.moyClasse) : null,
      },
      ...notes,
    ]);
    setForm({ ...form, date: '', note: '', moyClasse: '' });
  }

  const totalCoef = notes.reduce((s, n) => s + n.coef, 0);
  const moyennePonderee = totalCoef
    ? (notes.reduce((s, n) => s + n.note * n.coef, 0) / totalCoef).toFixed(2)
    : '-';

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-ink">Mes notes & DM</h1>
            <p className="text-ink-soft mt-1">Coefficients calés sur ta filière.</p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={filiere}
              onChange={(e) => {
                setFiliere(e.target.value);
                setForm((f) => ({ ...f, matiere: FILIERES[e.target.value].matieres[0].nom }));
              }}
              className="px-4 py-2 rounded-full border border-sky-soft bg-white font-semibold text-ink-soft"
            >
              {FILIERES_LISTE.map((f) => (
                <option key={f} value={f}>{FILIERES[f].label}</option>
              ))}
            </select>

            <div className="px-5 py-2 rounded-full bg-sky text-white font-bold">
              Moyenne pondérée : {moyennePonderee} / 20
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <form onSubmit={ajouterNote} className="grid grid-cols-2 md:grid-cols-6 gap-3 p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] mb-8">
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="col-span-2 md:col-span-1 px-3 py-2 rounded-xl border border-sky-soft"
          />
          <select
            value={form.matiere}
            onChange={(e) => setForm({ ...form, matiere: e.target.value })}
            className="col-span-2 md:col-span-2 px-3 py-2 rounded-xl border border-sky-soft"
          >
            {matieresFiliere.map((m) => (
              <option key={m.nom} value={m.nom}>{m.nom} (coef {m.coef})</option>
            ))}
          </select>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft"
          >
            <option>DS</option>
            <option>DM</option>
            <option>Colle</option>
          </select>
          <input
            type="number" step="0.25" min="0" max="20" required placeholder="Note /20"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft"
          />
          <input
            type="number" step="0.1" min="0" max="20" placeholder="Moy. classe"
            value={form.moyClasse}
            onChange={(e) => setForm({ ...form, moyClasse: e.target.value })}
            className="px-3 py-2 rounded-xl border border-sky-soft"
          />
          <button type="submit" className="col-span-2 md:col-span-6 bg-sky hover:bg-sky-deep text-white font-bold py-2 rounded-xl transition-colors">
            + Ajouter
          </button>
        </form>

        {/* Tableau */}
        <div className="rounded-3xl bg-white border border-sky-soft overflow-hidden shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
          <table className="w-full text-left text-ink">
            <thead className="bg-sky-soft/60 border-b border-sky-soft">
              <tr>
                <th className="p-4 font-bold text-ink-soft">Date</th>
                <th className="p-4 font-bold text-ink-soft">Matière</th>
                <th className="p-4 font-bold text-ink-soft">Type</th>
                <th className="p-4 font-bold text-ink-soft text-right">Coef</th>
                <th className="p-4 font-bold text-ink-soft text-right">Note</th>
                <th className="p-4 font-bold text-ink-soft text-right">Moy. classe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-soft">
              {notes.map((n) => (
                <tr key={n.id} className="hover:bg-sky-soft/40 transition-colors">
                  <td className="p-4">{n.date}</td>
                  <td className="p-4 font-bold text-sky-deep">{n.matiere}</td>
                  <td className="p-4">{n.type}</td>
                  <td className="p-4 text-right text-ink-soft">{n.coef}</td>
                  <td className="p-4 text-right font-bold text-xl">{n.note.toFixed(1)} / 20</td>
                  <td className="p-4 text-right text-ink-soft">{n.moyClasse ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}