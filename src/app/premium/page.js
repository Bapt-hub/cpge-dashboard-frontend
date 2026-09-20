// Fichier : src/app/premium/page.js
import Link from 'next/link';
import Clouds from '@/components/decor/Clouds';

const OUTILS_PREMIUM = [
  { href: '/premium/classement', titre: 'Classement national estimé', desc: 'Ta position face aux autres élèves de ta filière, par crowdsourcing.' },
  { href: '/premium/probabilites', titre: "Probabilité d'admissibilité", desc: "Modèle prédictif croisant ta moyenne et les seuils SCEI de l'école visée." },
  { href: '/premium/analyses', titre: 'Analyses graphiques avancées', desc: 'Évolution par matière, forces et faiblesses face au concours.' },
  { href: '/premium/objectifs', titre: "Planificateur d'objectifs", desc: 'La moyenne à viser aux écrits restants pour décrocher ton admissibilité.' },
];

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl bg-sky p-10 mb-12 text-center text-white">
          <Clouds />
          <div className="relative">
            <h1 className="font-heading text-4xl font-extrabold mb-4">Passe à la vitesse supérieure</h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Débloque la puissance des algorithmes pour estimer tes chances aux concours et comparer tes performances au niveau national.
            </p>
          </div>
        </div>

        {/* Les 4 outils premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {OUTILS_PREMIUM.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="p-6 rounded-3xl bg-amber-soft border-2 border-amber hover:-translate-y-1 transition-all"
            >
              <h3 className="font-heading font-bold text-ink mb-2">{o.titre} 🚀</h3>
              <p className="text-ink-soft text-sm">{o.desc}</p>
            </Link>
          ))}
        </div>

        {/* Comparatif des offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="p-8 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
            <h2 className="font-heading text-2xl font-bold text-ink mb-2">Gratuit</h2>
            <p className="text-4xl font-black text-ink mb-6">0€ <span className="text-lg font-normal text-ink-soft">/mois</span></p>
            <ul className="space-y-3 text-ink-soft mb-8">
              <li>✅ Suivi illimité des notes, DS et colles</li>
              <li>✅ Calculateur de moyenne intelligent</li>
              <li>✅ Agenda & kanban de révision</li>
              <li>✅ Annuaire SCEI de base</li>
            </ul>
            <button className="w-full py-3 rounded-full bg-sky-soft text-ink-soft font-bold cursor-not-allowed">
              Ton plan actuel
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-amber-soft border-2 border-amber shadow-[0_12px_28px_-10px_rgba(255,176,59,0.45)] relative hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber text-white px-3 py-1 rounded-full text-sm font-bold">
              Le plus populaire
            </div>
            <h2 className="font-heading text-2xl font-bold text-sky-deep mb-2">Premium ⭐</h2>
            <p className="text-4xl font-black text-ink mb-6">4.99€ <span className="text-lg font-normal text-ink-soft">/mois</span></p>
            <ul className="space-y-3 text-ink-soft mb-8">
              <li className="font-bold text-ink">🚀 Tout le plan gratuit, plus :</li>
              <li>🚀 Estimation du rang national</li>
              <li>🚀 Probabilité d'admissibilité</li>
              <li>🚀 Analyses graphiques avancées</li>
              <li>🚀 Planificateur d'objectifs de concours</li>
            </ul>
            <button className="w-full py-3 rounded-full bg-amber text-white font-bold hover:brightness-105 transition-all">
              Débloquer Premium
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}