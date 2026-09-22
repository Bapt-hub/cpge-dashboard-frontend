// Fichier : src/components/PremiumNavButton.js
'use client';

import Link from 'next/link';
import { usePremium } from '@/context/PremiumContext';

export default function PremiumNavButton() {
  const { isPremium, pret } = usePremium();

  if (!pret) return <span className="px-4 py-2" />;

  if (isPremium) {
    return (
      <Link href="/premium" className="bg-mint text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:brightness-105 transition-all">
        Premium actif ⭐
      </Link>
    );
  }

  return (
    <Link href="/premium" className="bg-amber text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:brightness-105 transition-all">
      Passer Premium ⭐
    </Link>
  );
}