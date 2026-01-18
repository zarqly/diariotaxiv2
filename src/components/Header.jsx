// src/components/Header.jsx
import React from 'react';
import { Menu, LogOut } from 'lucide-react';

export default function Header({ title, onMenuClick, onLogout }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={28} />
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}
