// Fichier : src/components/PremiumGate.js
'use client';

import Link from 'next/link';
import { usePremium } from '@/context/PremiumContext';

export default function PremiumGate({ children, titre = 'Fonctionnalité Premium', compact = false }) {
  const { isPremium, pret } = usePremium();

  // Le temps que localStorage soit lu côté client, on n'affiche rien pour éviter un flash
  if (!pret) return <div className="min-h-[120px]" />;

  if (isPremium) return children;

  return (
    <div className="relative rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div aria-hidden="true" className="pointer-events-none select-none blur-sm opacity-50">
        {children}
      </div>
      <Link
        href="/premium"
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/50 backdrop-blur-[1px] text-center px-4 hover:bg-white/60 transition-colors cursor-pointer ${compact ? 'py-4' : 'py-8'}`}
      >
        <span className="text-2xl">🔒</span>
        <p className="font-heading font-bold text-ink text-sm">{titre}</p>
        <span className="mt-1 px-4 py-1.5 rounded-full bg-amber text-white text-sm font-bold">
          Débloquer Premium ⭐
        </span>
      </Link>
    </div>
  );
}