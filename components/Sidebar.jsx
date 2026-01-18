// src/components/Sidebar.jsx
import React from 'react';
import { X, ChevronRight, User, Home, TrendingUp, BarChart3, PieChart, Clock, FolderOpen, Settings } from 'lucide-react';

const menuItems = [
  { id: 'diario', label: 'Dietario', icon: Home },
  { id: 'semanal', label: 'Semanal', icon: TrendingUp },
  { id: 'mensual', label: 'Mensual', icon: BarChart3 },
  { id: 'anual', label: 'Anual', icon: PieChart },
  { id: 'total', label: 'Total', icon: Clock },
  { id: 'personalizado', label: 'Personalizado', icon: FolderOpen },
  { id: 'backup', label: 'Ajustes', icon: Settings }
];

export default function Sidebar({ isOpen, activeTab, userEmail, onClose, onTabChange }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del menú */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Dietario Taxi</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 p-2 bg-white/10 rounded-lg">
            <User size={20} />
            <p className="text-blue-100 text-sm truncate">{userEmail}</p>
          </div>
        </div>

        {/* Items del menú */}
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon size={22} />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight size={20} />}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
