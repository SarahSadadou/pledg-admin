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

export default function GestionStocks() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [form, setForm] = useState({ nom: '', quantite: '', prix: '', date: '' });

  useEffect(() => {
    fetchStocks();
  }, []);

  async function fetchStocks() {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setStocks(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nom, quantite, prix, date } = form;
    const { error } = await supabase
      .from('stocks')
      .insert([{ nom, quantite: Number(quantite), prix: Number(prix), date }]);
    if (error) console.error(error);
    else {
      fetchStocks();
      setForm({ nom: '', quantite: '', prix: '', date: '' });
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text('📦 Liste des Stocks', 20, 20);
    autoTable(doc, {
      head: [['Nom', 'Quantité', 'Prix', 'Date']],
      body: stocks.map(stock => [stock.nom, stock.quantite, stock.prix, stock.date]),
    });
    doc.save('stocks.pdf');
  }

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📦 Gestion des Stocks</h1>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Ajouter un stock</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom du produit"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantité"
            value={form.quantite}
            onChange={e => setForm({ ...form, quantite: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Prix unitaire"
            value={form.prix}
            onChange={e => setForm({ ...form, prix: e.target.value })}
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Enregistrer
          </button>
        </form>
      </div>

      {/* Liste des stocks */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📋 Liste des stocks</h2>
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
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Quantité</th>
              <th className="border px-4 py-2">Prix</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{stock.nom}</td>
                <td className="border px-4 py-2">{stock.quantite}</td>
                <td className="border px-4 py-2">{stock.prix}</td>
                <td className="border px-4 py-2">{stock.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
