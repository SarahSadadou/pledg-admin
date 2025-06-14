'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface SubMenuItem {
  href: string;
  icon: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  subItems: SubMenuItem[];
}

export function MegaMenu() {
  const { theme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const menuItems: MenuItem[] = [
    {
      id: 'logo-section',
      label: '',
      icon: '',
      subItems: [],
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      subItems: [],
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: '📞',
      subItems: [
        { href: '/contact/board-members', icon: '👔', label: 'Board Members' },
        { href: '/contact/members', icon: '👥', label: 'Members' },
        { href: '/contact/freelance', icon: '🚀', label: 'Freelance' },
        { href: '/contact/partners', icon: '🤝', label: 'Partners' },
        { href: '/contact/investors', icon: '💰', label: 'Investors' },
        { href: '/contact/externe', icon: '🔧', label: 'Externe' },
        { href: '/contact/network', icon: '🌐', label: 'Network' },
      ],
    },
    {
      id: 'commercial',
      label: 'Commercial',
      icon: '🤝',
      subItems: [
        {
          href: '/commercial/lead',
          icon: '👥',
          label: 'Leads'
        },
        {
          href: '/commercial/clients',
          icon: '🤝',
          label: 'Clients'
        },
        {
          href: '/commercial/prestations',
          icon: '🛠️',
          label: 'Prestations'
        },
        {
          href: '/commercial/packages',
          icon: '📦',
          label: 'Packages'
        },
        {
          href: '/commercial/formation',
          icon: '📚',
          label: 'Formation'
        },
        {
          href: '/commercial/autres-offres',
          icon: '🎯',
          label: 'Autres Offres'
        },
        {
          href: '/commercial/waitlist',
          icon: '⏳',
          label: 'Liste d\'attente'
        }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: '📢',
      subItems: [
        { href: '/communication/presse', icon: '📰', label: 'Presse' },
        { href: '/communication/relations-publiques/page', icon: '🤝', label: 'Relations Publiques' },
        { href: '/communication/newsletter', icon: '📧', label: 'Newsletter' },
        { href: '/communication/reseaux-sociaux/page', icon: '📱', label: 'Réseaux Sociaux' },
        { href: '/communication/evenements', icon: '🎪', label: 'Événements' },
        { href: '/communication/blog', icon: '✍️', label: 'Blog' },
      ],
    },
    {
      id: 'comptabilite',
      label: 'Comptabilité',
      icon: '💰',
      subItems: [
        { href: '/comptabilite/facture', icon: '💸', label: 'Facture' },
        { href: '/comptabilite/devis', icon: '📜', label: 'Devis' },
        { href: '/comptabilite/depenses', icon: '💰', label: 'Dépenses' },
        { href: '/comptabilite/recettes', icon: '📈', label: 'Recettes' },
        { href: '/comptabilite/gestion-fournisseurs', icon: '👥', label: 'Fournisseurs' },
        { href: '/comptabilite/comptes-bancaires', icon: '🏦', label: 'Comptes bancaires' },
        { href: '/comptabilite/ecritures-comptables', icon: '📝', label: 'Écritures comptables' },
        { href: '/comptabilite/tva-et-taxes', icon: '💼', label: 'TVA & Taxes' },
        { href: '/comptabilite/rapports-financiers', icon: '📊', label: 'Rapports financiers' },
        { href: '/comptabilite/salaires-paiements', icon: '💵', label: 'Salaires & Paiements' },
        { href: '/comptabilite/export-integration', icon: '🔄', label: 'Export & Intégration' },
      ],
    },
    {
      id: 'informatique',
      label: 'Informatique',
      icon: '💻',
      subItems: [
        { href: '/informatique/fiche-technique', icon: '📋', label: 'Fiche Technique' },
        { href: '/informatique/cahier-des-charges', icon: '📑', label: 'Cahier des charges' },
        { href: '/informatique/projets-clients', icon: '👥', label: 'Projets clients' },
        { href: '/informatique/projets-interne', icon: '🏢', label: 'Projets Interne' },
        { href: '/informatique/mise-a-jour', icon: '🔄', label: 'Mise à jour' },
        { href: '/informatique/test-et-validation', icon: '✅', label: 'Test et validation' },
        { href: '/informatique/serveurs', icon: '🖥️', label: 'Serveurs' },
        { href: '/informatique/vpn-acces', icon: '🔑', label: 'VPN & Accès' },
        { href: '/informatique/nom-de-domaine', icon: '🌐', label: 'Nom de domaine' },
        { href: '/informatique/architectures', icon: '🏗️', label: 'Architectures' },
        { href: '/informatique/automatisation', icon: '🤖', label: 'Automatisation' },
        { href: '/informatique/devops', icon: '⚙️', label: 'DevOps' },
        { href: '/informatique/cybersecurite', icon: '🔒', label: 'Cybersécurité' },
        { href: '/informatique/documentations', icon: '📚', label: 'Documentations' },
        { href: '/informatique/outils-metiers', icon: '🛠️', label: 'Outils Métiers' },
      ]
    },
    {
      id: 'developpement-durable',
      label: 'Impact Durable',
      icon: '🌱',
      subItems: [
        { href: '/developpement-durable/strategie', icon: '🌍', label: 'Engagements' },
        { href: '/developpement-durable/energies', icon: '💡', label: 'Énergies' },
        { href: '/developpement-durable/recyclage', icon: '♻️', label: 'Recyclage' },
        { href: '/developpement-durable/eco-conception', icon: '🚀', label: 'Éco-conception' },
        { href: '/developpement-durable/empreinte', icon: '👣', label: 'Empreinte' },
        { href: '/developpement-durable/mobilite', icon: '🚲', label: 'Mobilité Durable' },
        { href: '/developpement-durable/impact-social', icon: '🤝', label: 'Impact Social' },
        { href: '/developpement-durable/mesure-impact', icon: '📏', label: 'Mesure d\'Impact' },
      ],
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: '🎯',
      subItems: [
        {
          href: '/marketing/email-marketing',
          icon: '📧',
          label: 'Email Marketing'
        },
        {
          href: '/marketing/reseaux-sociaux',
          icon: '🌐',
          label: 'Réseaux Sociaux'
        },
        {
          href: '/marketing/publicite',
          icon: '📢',
          label: 'Publicité'
        },
        {
          href: '/marketing/contenu',
          icon: '📝',
          label: 'Contenu'
        },
        {
          href: '/marketing/branding',
          icon: '🎨',
          label: 'Branding'
        },
        {
          href: '/marketing/affiliation',
          icon: '🤝',
          label: 'Affiliation'
        },
        {
          href: '/marketing/fidelisation',
          icon: '🎯',
          label: 'Fidélisation'
        },
        {
          href: '/marketing/seo-sem',
          icon: '🔍',
          label: 'SEO/SEM'
        },
        {
          href: '/marketing/ambassadeur',
          icon: '👑',
          label: 'Ambassadeur'
        },
        {
          href: '/marketing/geomarketing',
          icon: '🗺️',
          label: 'Geomarketing'
        }
      ]
    },
    {
      id: 'operations',
      label: 'Opérations',
      icon: '⚙️',
      subItems: [
        { href: '/operations/gestion-stocks', icon: '📍', label: 'Stocks' },
        { href: '/operations/temps-livraison', icon: '🚛', label: 'Livraison' },
        { href: '/operations/gestion-societe', icon: '🏢', label: 'Gestion des Societe' },
        { href: '/operations/suivi-missions', icon: '📦', label: 'Suivi des Missions' },
        { href: '/operations/remboursements', icon: '🔄', label: 'Remboursements' },
        { href: '/operations/couts-budgetisation', icon: '💰', label: 'Coûts & Budgétisation' },
        { href: '/operations/achats', icon: '📜', label: 'Achats' },
        { href: '/operations/planification', icon: '📅', label: 'Prévisions' },
        { href: '/operations/fournisseurs', icon: '📡', label: 'Fournisseurs' },
        { href: '/operations/optimisation', icon: '📈', label: 'Optimisation' },
      ],
    },
    {
      id: 'rh',
      label: 'RH',
      icon: '👥',
      subItems: [
        { href: '/ressources-humaines/recrutement', icon: '🔍', label: 'Recrutement' },
        { href: '/ressources-humaines/staff', icon: '👥', label: 'Staff' },
        { href: '/ressources-humaines/formation', icon: '📚', label: 'Formation' },
        { href: '/ressources-humaines/administration', icon: '📋', label: 'Administration' },
        { href: '/ressources-humaines/conformite', icon: '⚖️', label: 'Conformité' },
        { href: '/ressources-humaines/paie', icon: '💰', label: 'Paie' },
        { href: '/ressources-humaines/performance', icon: '📊', label: 'Performance' },
        { href: '/ressources-humaines/culture', icon: '🌟', label: 'Culture' },
        { href: '/ressources-humaines/carriere', icon: '🚀', label: 'Carrière' }, // 🔥 Pointage vers la bonne route
      ],
    },
    {
      id: 'strategie',
      label: 'Stratégie',
      icon: '🧠',
      subItems: [
        { href: '/strategie/vision-objectifs', icon: '🚀', label: 'Vision & Objectifs' },
        { href: '/strategie/strategie-financiere', icon: '💰', label: 'Stratégie Financière' },
        { href: '/strategie/transformation-digitale', icon: '🔄', label: 'Transformation Digitale' },
        { href: '/strategie/alignement', icon: '🎯', label: 'Alignement Interdépartemental' },
        { href: '/strategie/innovation', icon: '📦', label: 'Innovation & Product Research' },
      ],
    },
    {
      id: 'workspace',
      label: 'Workspace',
      icon: '💼',
      subItems: [
        { href: '/workspace/projects', icon: '📊', label: 'Projects' },
        { href: '/workspace/tasks', icon: '✅', label: 'Tasks' },
        { href: '/workspace/calendar', icon: '📅', label: 'Calendar' },
        { href: '/workspace/documents', icon: '📄', label: 'Documents' },
        { href: '/workspace/meetings', icon: '👥', label: 'Meetings' },
        { href: '/workspace/reports', icon: '📈', label: 'Reports' },
      ],
    },
    {
      id: 'parametres',
      label: 'Paramètres',
      icon: '⚙️',
      subItems: [
        { href: '/parametres/profile', icon: '👤', label: 'Profile' },
        { href: '/parametres/securite', icon: '🔒', label: 'Sécurité' },
        { href: '/parametres/notifications', icon: '🔔', label: 'Notifications' },
        { href: '/parametres/preferences', icon: '⚙️', label: 'Préférences' },
        { href: '/parametres/theme', icon: '🎨', label: 'Thème' },
      ],
    },
  ];

  return (
    <div className="fixed left-0 top-0 flex h-screen">
      <nav className={cn(
        'flex flex-col w-64 bg-white dark:bg-gray-800',
        'border-r border-gray-200 dark:border-gray-700',
        'transition-colors duration-200 ease-in-out'
      )}>
        {/* Logo and User Section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <img
              src={theme === 'dark' ? '/logo/logo-white.png' : '/logo/logo-black.png'}
              alt="Logo"
              className="h-16"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Bonjour,
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              User Name
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.filter(item => item.id !== 'logo-section' && item.id !== 'parametres').map((item) => (
            <div key={item.id} className="relative">
              {item.id === 'dashboard' ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    'w-full px-4 py-2 text-left flex items-center justify-between',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors duration-200'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={cn(
                    'w-full px-4 py-2 text-left flex items-center justify-between',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors duration-200',
                    activeMenu === item.id ? 'bg-gray-100 dark:bg-gray-700' : '',
                    item.id === 'workspace' && 'my-2 bg-blue-50 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-800'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "text-xl",
                      item.id === 'workspace' && 'text-blue-600 dark:text-blue-400'
                    )}>{item.icon}</span>
                    <span className={cn(
                      "text-sm font-medium text-gray-900 dark:text-white",
                      item.id === 'workspace' && 'font-semibold'
                    )}>
                      {item.label}
                    </span>
                  </div>
                  <svg
                    className={cn(
                      'w-4 h-4 text-gray-500 dark:text-gray-400',
                      'transition-transform duration-200',
                      activeMenu === item.id ? 'rotate-90' : '',
                      item.id === 'workspace' && 'text-blue-500 dark:text-blue-400'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Parameters Section at Bottom - Made more discrete */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          {menuItems.filter(item => item.id === 'parametres').map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleMenuClick(item.id)}
                className={cn(
                  'w-full px-3 py-1.5 text-left flex items-center justify-between', 
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'transition-colors duration-200',
                  activeMenu === item.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                )}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-400">
                    {item.label}
                  </span>
                </div>
                <svg
                  className={cn(
                    'w-3 h-3 text-gray-500 dark:text-gray-400',
                    'transition-transform duration-200',
                    activeMenu === item.id ? 'rotate-90' : ''
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* Submenu Container */}
      {activeMenu && (
        <>
          {activeMenu !== 'parametres' ? (
            <div className="h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              {menuItems.map((item) => {
                if (item.id === activeMenu) {
                  return (
                    <div key={item.id} className="h-full flex flex-col">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            'w-full px-4 py-2 text-left',
                            'hover:bg-gray-100 dark:hover:bg-gray-700',
                            'transition-colors duration-200',
                            'flex items-center space-x-3',
                            'text-gray-900 dark:text-white'
                          )}
                        >
                          <span className="text-lg">{subItem.icon}</span>
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="absolute bottom-0 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-md shadow-lg z-10 max-h-64 overflow-auto">
              {menuItems.filter(item => item.id === 'parametres').map((item) => (
                <div key={item.id} className="flex flex-col text-xs">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'w-full text-left',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        'transition-colors duration-200',
                        'flex items-center',
                        'text-gray-900 dark:text-white',
                        'px-3 py-1.5 space-x-2 text-xs'
                      )}
                    >
                      <span className="text-sm">{subItem.icon}</span>
                      <span className="text-xs font-normal">
                        {subItem.label}
                      </span>
                    </Link>
                  ))}

                  {/* Theme Toggle for Parameters */}
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2"> 
                        <span className="text-sm">
                          {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                        <span className="text-xs font-normal text-gray-700 dark:text-gray-400"> 
                          {theme === 'dark' ? 'Mode Sombre' : 'Mode Clair'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setTheme(theme === 'dark' ? 'light' : 'dark');
                        }}
                        className={cn(
                          'relative inline-flex h-5 w-9 items-center rounded-full', /* Made toggle smaller */
                          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200',
                          'transition-colors duration-200 ease-in-out'
                        )}
                      >
                        <span
                          className={cn(
                            'inline-block h-3 w-3 transform rounded-full bg-white', /* Made toggle handle smaller */
                            'transition-transform duration-200 ease-in-out',
                            theme === 'dark' ? 'translate-x-5' : 'translate-x-1' /* Adjusted translation */
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setActiveMenu(null)}
          />
        </>
      )}
    </div>
  );
}

export default MegaMenu;