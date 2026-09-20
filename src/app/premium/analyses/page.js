// Fichier : src/app/premium/analyses/page.js
'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

const PERF_PAR_MATIERE = [
  { matiere: 'Maths', moi: 14.2, concours: 12.5 },
  { matiere: 'Physique', moi: 12.8, concours: 12.0 },
  { matiere: 'SI', moi: 10.5, concours: 11.8 },
  { matiere: 'Français', moi: 13.0, concours: 11.5 },
  { matiere: 'Anglais', moi: 15.1, concours: 12.2 },
];

const PROFIL = PERF_PAR_MATIERE.map((m) => ({ matiere: m.matiere, score: m.moi }));

export default function AnalysesPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-soft text-amber font-bold text-sm mb-3">Premium ⭐</span>
          <h1 className="font-heading text-3xl font-extrabold text-ink">Analyses graphiques avancées</h1>
          <p className="text-ink-soft mt-1">Tes performances par matière face à la moyenne des admis au concours visé.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] mb-6">
          <h2 className="font-heading font-bold text-ink mb-4">Moi vs. moyenne des admis</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERF_PAR_MATIERE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCF0FF" />
                <XAxis dataKey="matiere" stroke="#5B7A99" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 20]} stroke="#5B7A99" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #DCF0FF' }} />
                <Bar dataKey="moi" fill="#4FA8E8" radius={[6, 6, 0, 0]} name="Ma moyenne" />
                <Bar dataKey="concours" fill="#FFB03B" radius={[6, 6, 0, 0]} name="Moyenne des admis" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)]">
          <h2 className="font-heading font-bold text-ink mb-4">Profil forces / faiblesses</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={PROFIL}>
                <PolarGrid stroke="#DCF0FF" />
                <PolarAngleAxis dataKey="matiere" stroke="#5B7A99" />
                <PolarRadiusAxis domain={[0, 20]} stroke="#5B7A99" />
                <Radar dataKey="score" stroke="#4FA8E8" fill="#4FA8E8" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}