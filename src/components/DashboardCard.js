// Fichier : src/components/DashboardCard.js

const ACCENTS = {
  sky: { valeur: 'text-sky-deep', barre: 'bg-sky' },
  mint: { valeur: 'text-mint', barre: 'bg-mint' },
  amber: { valeur: 'text-amber', barre: 'bg-amber' },
  coral: { valeur: 'text-coral', barre: 'bg-coral' },
  violet: { valeur: 'text-violet', barre: 'bg-violet' },
};

export default function DashboardCard({ titre, valeur, sousTitre, accent = 'sky' }) {
  const couleurs = ACCENTS[accent] ?? ACCENTS.sky;

  return (
    <div className="relative p-6 pt-7 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(79,168,232,0.45)] transition-all duration-300 cursor-pointer overflow-hidden">

      {/* Petite barre de couleur en haut, pour distinguer les cartes d'un coup d'œil */}
      <span className={`absolute top-0 left-0 right-0 h-1.5 ${couleurs.barre}`} aria-hidden="true" />

      <h3 className="text-sm font-bold text-ink-soft">
        {titre}
      </h3>

      <p className={`font-heading text-3xl font-bold mt-2 ${couleurs.valeur}`}>
        {valeur}
      </p>

      <p className="text-sm text-ink-soft mt-2">
        {sousTitre}
      </p>

    </div>
  );
}