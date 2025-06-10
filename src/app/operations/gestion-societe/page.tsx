'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GestionSocietes() {
  const [societes, setSocietes] = useState<any[]>([]);
  const [form, setForm] = useState({ nom: '', adresse: '', secteur: '', date_creation: '' });
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    fetchSocietes();
  }, []);

  async function fetchSocietes() {
    const { data, error } = await supabase.from('societes').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setSocietes(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nom, adresse, secteur, date_creation } = form;
    const { error } = await supabase.from('societes').insert([{ nom, adresse, secteur, date_creation }]);
    if (error) console.error(error);
    else {
      fetchSocietes();
      setForm({ nom: '', adresse: '', secteur: '', date_creation: '' });
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text('🏢 Liste des Sociétés', 20, 20);
    autoTable(doc, {
      head: [['Nom', 'Adresse', 'Secteur', 'Date de création']],
      body: societes.map(s => [s.nom, s.adresse, s.secteur, s.date_creation]),
    });
    doc.save('societes.pdf');
  }

  const societesFiltrees = filtre
    ? societes.filter(s => s.secteur.toLowerCase().includes(filtre.toLowerCase()))
    : societes;

  const secteurs = societes.map(s => s.secteur);
  const secteurCounts = secteurs.reduce((acc, secteur) => {
    acc[secteur] = (acc[secteur] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(secteurCounts),
    datasets: [
      {
        label: 'Nombre de sociétés',
        data: Object.values(secteurCounts),
        backgroundColor: ['#6C5DD3', '#4D4C7D', '#3E3B6A', '#2F2B5B', '#1F1A4C'],
      },
    ],
  };

  return (
    <div className="p-8 ml-64 bg-[#1E1E2D] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-[#E0E0E0] mb-6">🏢 Gestion des Sociétés</h1>

      {/* Statistiques */}
      <div className="bg-[#2A2A3D] p-6 rounded-lg shadow-md mb-6 flex gap-4">
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Total sociétés</p>
          <p className="text-2xl font-bold">{societes.length}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Secteurs uniques</p>
          <p className="text-2xl font-bold">{Object.keys(secteurCounts).length}</p>
        </div>
      </div>

      {/* Formulaire + Camembert côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Formulaire */}
        <div className="bg-[#2A2A3D] p-6 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-4">Ajouter une société</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required className="w-full border border-gray-600 p-2 rounded bg-[#1E1E2D] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600" />
            <input type="text" placeholder="Adresse" value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} required className="w-full border border-gray-600 p-2 rounded bg-[#1E1E2D] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600" />
            <input type="text" placeholder="Secteur" value={form.secteur} onChange={e => setForm({ ...form, secteur: e.target.value })} required className="w-full border border-gray-600 p-2 rounded bg-[#1E1E2D] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600" />
            <input type="date" value={form.date_creation} onChange={e => setForm({ ...form, date_creation: e.target.value })} required className="w-full border border-gray-600 p-2 rounded bg-[#1E1E2D] text-white focus:ring-2 focus:ring-purple-600" />
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">Enregistrer</button>
          </form>
        </div>

        {/* Camembert */}
        <div className="bg-[#2A2A3D] p-6 rounded-lg shadow-md flex justify-center items-center">
          <div className="w-60 h-60">
            <Pie data={chartData} />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-4">
        <input type="text" placeholder="Filtrer par secteur" value={filtre} onChange={e => setFiltre(e.target.value)} className="border border-gray-600 p-2 rounded w-full max-w-sm bg-[#1E1E2D] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600" />
      </div>

      {/* Liste des sociétés */}
      <div className="bg-[#2A2A3D] p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📋 Liste des sociétés</h2>
          <button onClick={exportPDF} className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">Exporter PDF</button>
        </div>
        <table className="w-full table-auto border-collapse text-white">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Adresse</th>
              <th className="border px-4 py-2">Secteur</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {societesFiltrees.map(s => (
              <tr key={s.id} className="hover:bg-purple-800/50">
                <td className="border px-4 py-2">{s.nom}</td>
                <td className="border px-4 py-2">{s.adresse}</td>
                <td className="border px-4 py-2">{s.secteur}</td>
                <td className="border px-4 py-2">{s.date_creation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
