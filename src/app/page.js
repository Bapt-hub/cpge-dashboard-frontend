// Fichier : src/app/page.js
import DashboardCard from '@/components/DashboardCard';
import EvolutionChart from '@/components/EvolutionChart'

export default function Home() {
  return (
    // bg-gradient-to-br : Crée un dégradé du coin haut-gauche vers le bas-droite
    // from-blue-900 via-indigo-800 to-purple-900 : Les couleurs de notre dégradé
    <main className="min-h-screen bg-stone-50 p-8">

      <div className="max-w-7xl mx-auto">
        
        {/* Titre de bienvenue en blanc pour bien ressortir */}
        <div className="mb-10 text-[#4682B4]">
          <h1 className="text-4xl font-extrabold tracking-tight">Bonjour, Baptiste</h1>
          <p className="text-blue-00 mt-2 text-lg font-light">Voici ton résumé pour la semaine en cours.</p>
        </div>

        {/* Grille de nos cartes Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
          <DashboardCard 
            titre="Moyenne Générale" 
            valeur="12.8 / 20" 
            sousTitre="+0.5 depuis le dernier semestre"
          />
          
          <DashboardCard 
            titre="Prochain DS" 
            valeur="Physique" 
            sousTitre="Samedi 24 - Électromagnétisme"
          />

          <DashboardCard 
            titre="Classement Prépa" 
            valeur="8ème" 
            sousTitre="Sur 42 élèves en PCSI"
          />

          <DashboardCard 
            titre="Proba. d'admissibilité" 
            valeur="68 %" 
            sousTitre="⭐ Estimation Premium (Mines)"
          />

          <EvolutionChart/>


        </div>

      </div>
    </main>
  );
}