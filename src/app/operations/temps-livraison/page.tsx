'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Initialisation Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GestionLivraisons() {
  const [livraisons, setLivraisons] = useState<any[]>([]);
  const [form, setForm] = useState({
    client: '',
    destination: '',
    date: '',
    transporteur: '',
    statut: '',
  });

  useEffect(() => {
    fetchLivraisons();
  }, []);

  async function fetchLivraisons() {
    const { data, error } = await supabase
      .from('livraisons')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setLivraisons(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { client, destination, date, transporteur, statut } = form;
    const { error } = await supabase.from('livraisons').insert([{ client, destination, date, transporteur, statut }]);
    if (error) console.error(error);
    else {
      fetchLivraisons();
      setForm({ client: '', destination: '', date: '', transporteur: '', statut: '' });
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text('🚚 Liste des Livraisons', 20, 20);
    autoTable(doc, {
      head: [['Client', 'Destination', 'Date', 'Transporteur', 'Statut']],
      body: livraisons.map(liv => [liv.client, liv.destination, liv.date, liv.transporteur, liv.statut]),
    });
    doc.save('livraisons.pdf');
  }

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🚚 Gestion des Livraisons</h1>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Ajouter une livraison</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom du client"
            value={form.client}
            onChange={e => setForm({ ...form, client: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Destination"
            value={form.destination}
            onChange={e => setForm({ ...form, destination: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Transporteur"
            value={form.transporteur}
            onChange={e => setForm({ ...form, transporteur: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Statut"
            value={form.statut}
            onChange={e => setForm({ ...form, statut: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Enregistrer
          </button>
        </form>
      </div>

      {/* Liste des livraisons */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📋 Liste des livraisons</h2>
          <button
            onClick={exportPDF}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Exporter PDF
          </button>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Transporteur</th>
              <th className="border px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {livraisons.map(liv => (
              <tr key={liv.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{liv.client}</td>
                <td className="border px-4 py-2">{liv.destination}</td>
                <td className="border px-4 py-2">{liv.date}</td>
                <td className="border px-4 py-2">{liv.transporteur}</td>
                <td className="border px-4 py-2">{liv.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
