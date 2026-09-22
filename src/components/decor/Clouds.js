// Fichier : src/components/decor/Clouds.js
// Nuages décoratifs en SVG, clin d'œil discret à l'univers visuel de Solly.

function Cloud({ className }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M25 45c-11 0-20-8-20-18s9-18 20-18c3-8 12-14 22-14 11 0 20 7 23 17 10 1 18 9 18 19 0 10-9 18-20 18H25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Clouds() {
  return (
    <div className="cloud-field">
      <Cloud className="absolute -top-2 left-[8%] w-28 opacity-70 text-white/60" />
      <Cloud className="absolute top-10 right-[12%] w-40 opacity-50 text-violet-soft/70" />
      <Cloud className="absolute top-[38%] left-[45%] w-24 opacity-40 text-white/60" />
    </div>
  );
}