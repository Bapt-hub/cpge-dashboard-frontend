// Fichier : src/components/PremiumNavMenu.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePremium } from '@/context/PremiumContext';

const OUTILS_PREMIUM = [
  { href: '/premium/classement', label: 'Classement national', icone: '🏆' },
  { href: '/premium/probabilites', label: "Probabilité d'admissibilité", icone: '🎯' },
  { href: '/premium/analyses', label: 'Analyses avancées', icone: '📊' },
  { href: '/premium/objectifs', label: "Planificateur d'objectifs", icone: '🚀' },
];

export default function PremiumNavMenu() {
  const { isPremium, pret } = usePremium();
  const router = useRouter();
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef(null);

  // Ferme le menu si on clique ailleurs
  useEffect(() => {
    function surClicExterieur(e) {
      if (ref.current && !ref.current.contains(e.target)) setOuvert(false);
    }
    document.addEventListener('mousedown', surClicExterieur);
    return () => document.removeEventListener('mousedown', surClicExterieur);
  }, []);

  function choisirOutil(href) {
    setOuvert(false);
    // Abonné → accès direct à l'outil. Non abonné → page d'achat Premium.
    router.push(pret && isPremium ? href : '/premium');
  }

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOuvert((v) => !v)}
        className="px-3 py-2 rounded-full text-sm text-ink-soft hover:text-sky-deep hover:bg-sky-soft font-semibold transition-colors whitespace-nowrap flex items-center gap-1"
      >
        Premium ⭐ <span className="text-xs">{ouvert ? '▲' : '▼'}</span>
      </button>

      {ouvert && (
        <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-sky-soft shadow-[0_12px_28px_-10px_rgba(79,168,232,0.35)] overflow-hidden z-50">
          {OUTILS_PREMIUM.map((o) => (
            <button
              key={o.href}
              onClick={() => choisirOutil(o.href)}
              className="w-full text-left px-4 py-3 hover:bg-sky-soft/50 transition-colors flex items-center gap-3 border-b border-sky-soft last:border-b-0"
            >
              <span className="text-lg">{o.icone}</span>
              <span className="text-sm font-semibold text-ink">{o.label}</span>
              {!(pret && isPremium) && <span className="ml-auto text-xs text-amber font-bold">🔒</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}