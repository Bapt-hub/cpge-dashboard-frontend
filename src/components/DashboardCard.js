// Fichier : src/components/DashboardCard.js

export default function DashboardCard({ titre, valeur, sousTitre }) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(79,168,232,0.45)] transition-all duration-300 cursor-pointer">

      <h3 className="text-sm font-bold text-ink-soft">
        {titre}
      </h3>

      <p className="font-heading text-3xl font-bold text-sky-deep mt-2">
        {valeur}
      </p>

      <p className="text-sm text-ink-soft mt-2">
        {sousTitre}
      </p>

    </div>
  );
}