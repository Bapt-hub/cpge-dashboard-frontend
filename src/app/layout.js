// Fichier : src/app/layout.js

import Link from 'next/link';
import { Baloo_2, Nunito } from 'next/font/google';
import { PremiumProvider } from '@/context/PremiumContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { NotesProvider } from '@/context/NotesContext';
import { PlanningProvider } from '@/context/PlanningContext';
import { ReferralProvider } from '@/context/ReferralContext';
import OnboardingGate from '@/components/OnboardingGate';
import PremiumNavButton from '@/components/PremiumNavButton';
import PremiumNavMenu from '@/components/PremiumNavMenu';
import ProfilNavLink from '@/components/ProfilNavLink';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-baloo',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'PrépaDash - Ton espace CPGE',
  description: 'Le tableau de bord ultime pour les étudiants en prépa',
};

const LIENS = [
  { href: '/', label: 'Accueil' },
  { href: '/notes', label: 'Notes & DM' },
  { href: '/calculateur', label: 'Calculateur' },
  { href: '/planning', label: 'Planning' },
  { href: '/scei', label: 'SCEI' },
  { href: '/progression', label: 'Progression' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="bg-background text-ink antialiased">
        <ProfileProvider>
        <NotesProvider>
        <PlanningProvider>
        <PremiumProvider>
        <ReferralProvider>

        {/* Barre de navigation claire, esprit Solly */}
        <nav className="no-print bg-white/90 backdrop-blur-sm shadow-sm border-b border-sky-soft sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center gap-4">

              {/* Logo / Retour à l'accueil */}
              <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-sky-deep shrink-0">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-sky text-white text-sm">PD</span>
                <span className="hidden sm:inline">PrépaDash</span>
              </Link>

              {/* Liens de navigation + Premium, même groupe pour un espacement homogène */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {LIENS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="px-3 py-2 rounded-full text-sm text-ink-soft hover:text-sky-deep hover:bg-sky-soft font-semibold transition-colors whitespace-nowrap"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <PremiumNavMenu />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <ProfilNavLink />
                <div className="h-6 w-px bg-sky-soft mx-1" />
                <PremiumNavButton />
              </div>
            </div>
          </div>
        </nav>

        <main>
          <OnboardingGate>{children}</OnboardingGate>
        </main>

        </ReferralProvider>
        </PremiumProvider>
        </PlanningProvider>
        </NotesProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}