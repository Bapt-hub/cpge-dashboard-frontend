// Fichier : src/app/page.js
import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import EvolutionChart from '@/components/EvolutionChart';
import Clouds from '@/components/decor/Clouds';

const RACCOURCIS = [
  { href: '/notes', label: 'Notes & DM' },
  { href: '/calculateur', label: 'Calculateur de moyenne' },
  { href: '/planning', label: 'Planning de révision' },
  { href: '/scei', label: 'Annuaire SCEI' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">

      <div className="max-w-7xl mx-auto">

        {/* Bandeau de bienvenue, fond bleu ciel avec nuages décoratifs */}
        <div className="relative overflow-hidden rounded-3xl bg-sky p-8 mb-8 text-white">
          <Clouds />
          <div className="relative">
            <h1 className="font-heading text-3xl font-extrabold">Bonjour, Baptiste 👋</h1>
            <p className="text-white/85 mt-2">Voici ton résumé pour la semaine en cours.</p>
          </div>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            titre="Moyenne générale"
            valeur="12.8 / 20"
            sousTitre="+0.5 depuis le dernier semestre"
          />

          <DashboardCard
            titre="Prochain DS"
            valeur="Physique"
            sousTitre="Samedi 24 - Électromagnétisme"
          />

          <DashboardCard
            titre="Classement prépa"
            valeur="8ème"
            sousTitre="Sur 42 élèves en PCSI"
          />

          <DashboardCard
            titre="Proba. d'admissibilité"
            valeur="68 %"
            sousTitre="⭐ Estimation Premium (Mines)"
          />

          <EvolutionChart />

        </div>

      </div>
    </main>
  );
}