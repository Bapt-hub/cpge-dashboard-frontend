// Fichier : src/components/ProfilNavLink.js
'use client';

import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';

export default function ProfilNavLink() {
  const { profil, pret } = useProfile();

  const initiales = pret && (profil.prenom || profil.nom)
    ? `${profil.prenom[0] ?? ''}${profil.nom[0] ?? ''}`.toUpperCase()
    : '👤';

  return (
    <Link
      href="/profil"
      title="Mon profil"
      className="grid place-items-center w-9 h-9 rounded-full bg-sky-soft text-sky-deep font-bold text-sm hover:bg-sky hover:text-white transition-colors"
    >
      {initiales}
    </Link>
  );
}