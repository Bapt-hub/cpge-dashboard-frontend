// Fichier : src/components/OnboardingGate.js
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

export default function OnboardingGate({ children }) {
  const { profil, pret } = useProfile();
  const pathname = usePathname();
  const router = useRouter();

  const doitOnboarder = pret && !profil.onboardingTermine && pathname !== '/onboarding';

  useEffect(() => {
    if (doitOnboarder) router.replace('/onboarding');
  }, [doitOnboarder, router]);

  // Tant qu'on ne sait pas encore (chargement localStorage) ou qu'on va rediriger, on n'affiche rien
  // pour éviter un flash du contenu protégé.
  if (!pret || doitOnboarder) return null;

  return children;
}