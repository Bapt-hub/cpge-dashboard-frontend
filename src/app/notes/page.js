// Fichier : src/app/notes/page.js

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-ink">Mes notes & DM</h1>
          <button className="bg-sky hover:bg-sky-deep text-white px-4 py-2 rounded-full font-bold transition-colors">
            + Ajouter une note
          </button>
        </div>

        {/* Tableau clair */}
        <div className="rounded-3xl bg-white border border-sky-soft overflow-hidden shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
          <table className="w-full text-left text-ink">
            <thead className="bg-sky-soft/60 border-b border-sky-soft">
              <tr>
                <th className="p-4 font-bold text-ink-soft">Date</th>
                <th className="p-4 font-bold text-ink-soft">Matière</th>
                <th className="p-4 font-bold text-ink-soft">Type</th>
                <th className="p-4 font-bold text-ink-soft text-right">Note</th>
                <th className="p-4 font-bold text-ink-soft text-right">Moy. classe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-soft">
              <tr className="hover:bg-sky-soft/40 transition-colors">
                <td className="p-4">24 Oct 2026</td>
                <td className="p-4 font-bold text-sky-deep">Physique</td>
                <td className="p-4">DS 3</td>
                <td className="p-4 text-right font-bold text-xl">14.5 / 20</td>
                <td className="p-4 text-right text-ink-soft">11.2</td>
              </tr>
              <tr className="hover:bg-sky-soft/40 transition-colors">
                <td className="p-4">18 Oct 2026</td>
                <td className="p-4 font-bold text-mint">Mathématiques</td>
                <td className="p-4">Colle</td>
                <td className="p-4 text-right font-bold text-xl">16.0 / 20</td>
                <td className="p-4 text-right text-ink-soft">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}