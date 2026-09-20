// Fichier : src/app/layout.js

import Link from 'next/link';
import { Baloo_2, Nunito } from 'next/font/google';
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

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="bg-background text-ink antialiased">

        {/* Barre de navigation claire, esprit Solly */}
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-sky-soft sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">

              {/* Logo / Retour à l'accueil */}
              <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-sky-deep">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-sky text-white text-sm">PR</span>
                PrépaRation
              </Link>

              {/* Liens de navigation */}
              <div className="flex items-center gap-2">
                <Link href="/" className="px-3 py-2 rounded-full text-ink-soft hover:text-sky-deep hover:bg-sky-soft font-semibold transition-colors">
                  Accueil
                </Link>
                <Link href="/notes" className="px-3 py-2 rounded-full text-ink-soft hover:text-sky-deep hover:bg-sky-soft font-semibold transition-colors">
                  Notes & DM
                </Link>
                <Link href="/scei" className="px-3 py-2 rounded-full text-ink-soft hover:text-sky-deep hover:bg-sky-soft font-semibold transition-colors">
                  Annuaire SCEI
                </Link>

                <div className="h-6 w-px bg-sky-soft mx-2" />

                <Link href="/premium" className="bg-amber text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:brightness-105 transition-all">
                  Passer Premium ⭐
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

      </body>
    </html>
  );
}