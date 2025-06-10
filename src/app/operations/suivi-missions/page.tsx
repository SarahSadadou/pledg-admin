'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SuiviMissions() {
  const [missions, setMissions] = useState<any[]>([]);
  const [form, setForm] = useState({ nom: '', description: '', date: '', statut: '' });
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    fetchMissions();
  }, []);

  async function fetchMissions() {
    const { data, error } = await supabase.from('missions').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setMissions(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nom, description, date, statut } = form;
    const { error } = await supabase.from('missions').insert([{ nom, description, date, statut }]);
    if (error) console.error(error);
    else {
      fetchMissions();
      setForm({ nom: '', description: '', date: '', statut: '' });
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text('📋 Rapport des Missions', 20, 20);
    autoTable(doc, {
      head: [['Nom', 'Description', 'Date', 'Statut']],
      body: missions.map(m => [m.nom, m.description, m.date, m.statut]),
    });
    doc.save('missions.pdf');
  }

  const missionsFiltrees = filtre
    ? missions.filter(m => m.statut.toLowerCase().includes(filtre.toLowerCase()))
    : missions;

  const totalMissions = missions.length;
  const missionsTerminees = missions.filter(m => m.statut.toLowerCase() === 'terminé').length;
  const pourcentageTerminees = totalMissions ? Math.round((missionsTerminees / totalMissions) * 100) : 0;

  return (
    <div className="p-8 ml-64 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-[#1A2533] mb-6">📋 Suivi des Missions</h1>

      {/* Statistiques rapides */}
      <div className="bg-[#1A2533] p-6 rounded-lg shadow-md mb-6 flex gap-4 text-white">
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Total missions</p>
          <p className="text-2xl font-bold">{totalMissions}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">% Missions terminées</p>
          <p className="text-2xl font-bold">{pourcentageTerminees}%</p>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-[#1A2533] mb-2">Progression globale</p>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div className="bg-[#1A2533] h-4 rounded-full" style={{ width: `${pourcentageTerminees}%` }}></div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#1A2533]">Ajouter une mission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom de la mission" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required className="w-full border border-[#1A2533] p-2 rounded focus:ring-2 focus:ring-[#1A2533]" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full border border-[#1A2533] p-2 rounded focus:ring-2 focus:ring-[#1A2533]" />
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required className="w-full border border-[#1A2533] p-2 rounded focus:ring-2 focus:ring-[#1A2533]" />
          <input type="text" placeholder="Statut (en cours, terminé...)" value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })} required className="w-full border border-[#1A2533] p-2 rounded focus:ring-2 focus:ring-[#1A2533]" />
          <button type="submit" className="w-full bg-[#1A2533] text-white py-2 rounded hover:bg-[#141d2a] transition">Enregistrer</button>
        </form>
      </div>

      {/* Filtres */}
      <div className="mb-4">
        <input type="text" placeholder="Filtrer par statut" value={filtre} onChange={e => setFiltre(e.target.value)} className="border border-[#1A2533] p-2 rounded w-full max-w-sm focus:ring-2 focus:ring-[#1A2533]" />
      </div>

      {/* Liste des missions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1A2533]">📋 Liste des missions</h2>
          <button onClick={exportPDF} className="bg-[#1A2533] text-white py-2 px-4 rounded hover:bg-[#141d2a] transition">Exporter PDF</button>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#1A2533] text-white">
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {missionsFiltrees.map(m => (
              <tr key={m.id} className="hover:bg-blue-100">
                <td className="border px-4 py-2">{m.nom}</td>
                <td className="border px-4 py-2">{m.description}</td>
                <td className="border px-4 py-2">{m.date}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white ${m.statut.toLowerCase() === 'terminé' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {m.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
