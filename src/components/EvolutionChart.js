// Fichier : src/components/EvolutionChart.js
'use client'; // Obligatoire car le graphique a des animations interactives

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Voici des fausses données en attendant celles du backend
const data = [
  { mois: 'Sept', moyenne: 10.5 },
  { mois: 'Oct', moyenne: 11.2 },
  { mois: 'Nov', moyenne: 10.8 },
  { mois: 'Déc', moyenne: 12.1 },
  { mois: 'Jan', moyenne: 12.8 },
];

export default function EvolutionChart() {
  return (
    <div className="mt-6 p-6 rounded-3xl bg-white border border-sky-soft shadow-[0_8px_24px_-12px_rgba(79,168,232,0.35)] lg:col-span-4">
      <h3 className="font-heading text-lg font-bold text-ink mb-6">Évolution de la moyenne générale</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DCF0FF" />
            <XAxis dataKey="mois" stroke="#5B7A99" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 20]} stroke="#5B7A99" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #DCF0FF', color: '#16324F' }} />
            <Line type="monotone" dataKey="moyenne" stroke="#4FA8E8" strokeWidth={4} dot={{ r: 6, fill: '#4FA8E8' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}