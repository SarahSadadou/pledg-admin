'use client';
import React from 'react';

const CarrierePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-6 ml-64">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Titre */}
        <div>
          <h1 className="text-4xl font-bold text-[#1A2533] text-center mb-4">✨ Rejoignez Pledge & Grow</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Rejoignez une entreprise jeune, ambitieuse et tournée vers l’avenir du digital. Chez Pledge & Grow, chaque talent compte.
          </p>
        </div>

        {/* Pourquoi nous rejoindre */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1A2533]">🌟 Pourquoi choisir Pledge & Grow ?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Culture d’innovation :</strong> Vous êtes libres de proposer et tester vos idées.</li>
            <li><strong>Esprit d’équipe :</strong> Une ambiance bienveillante et collaborative.</li>
            <li><strong>Projets réels :</strong> Des missions concrètes avec impact pour des clients réels.</li>
            <li><strong>Montée en compétences :</strong> Feedbacks, autonomie et responsabilités.</li>
          </ul>
        </section>

        {/* Offres disponibles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1A2533]">💼 Nos opportunités</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Développeur Front-End", desc: "Créer des interfaces modernes et accessibles.", location: "Paris", type: "CDI" },
              { title: "Chef de Projet", desc: "Coordonner les équipes et suivre les livrables.", location: "Lyon", type: "CDD" },
              { title: "UX/UI Designer", desc: "Concevoir des expériences utilisateurs intuitives.", location: "Télétravail", type: "Stage" },
              { title: "Développeur Back-End", desc: "Développer des APIs performantes et sécurisées.", location: "Lille", type: "Alternance" },
            ].map((job, i) => (
              <div key={i} className="bg-[#eef2f6] p-5 rounded-2xl">
                <h3 className="text-[#1A2533] font-bold mb-1">{job.title}</h3>
                <p className="text-gray-700 mb-1">{job.desc}</p>
                <p className="text-sm text-gray-500">{job.location} | {job.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Processus de candidature */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1A2533]">📩 Le processus de recrutement</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li><strong>Dépôt de candidature :</strong> CV + lettre (ou projet).</li>
            <li><strong>Échange rapide :</strong> Un premier contact pour discuter.</li>
            <li><strong>Entretien :</strong> Un test technique ou entretien métier.</li>
            <li><strong>Rencontre :</strong> Avec l’équipe pour valider l’adéquation.</li>
            <li><strong>Onboarding :</strong> Accueil et intégration personnalisée.</li>
          </ol>
        </section>

        {/* Contact */}
        <div className="text-center text-gray-600 pt-6 border-t">
          <p>📫 Candidature spontanée ? Écrivez-nous à <span className="text-[#1A2533] font-semibold">pledgeandgrow@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default CarrierePage;
