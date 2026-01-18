// src/App.jsx
import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import MonthlyView from './components/MonthlyView';
import AnnualView from './components/AnnualView';
import TotalView from './components/TotalView';
import CustomView from './components/CustomView';
import SettingsView from './components/SettingsView';

const menuItems = [
  { id: 'diario', label: 'Dietario' },
  { id: 'semanal', label: 'Semanal' },
  { id: 'mensual', label: 'Mensual' },
  { id: 'anual', label: 'Anual' },
  { id: 'total', label: 'Total' },
  { id: 'personalizado', label: 'Personalizado' },
  { id: 'backup', label: 'Ajustes' }
];

export default function App() {
  const { user, loading: authLoading, error, loginWithEmail, registerWithEmail, loginWithGoogle, logout } = useAuth();
  const { data, loading: dataLoading, setEntry, deleteEntry, clearAll, replaceAllData } = useData(user?.uid);
  const [activeTab, setActiveTab] = useState('diario');
  const [menuOpen, setMenuOpen] = useState(false);

  const getTabTitle = () => {
    const item = menuItems.find(item => item.id === activeTab);
    return item ? item.label : 'Dietario';
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  // Pantalla de carga
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Pantalla de login
  if (!user) {
    return (
      <LoginScreen
        onLogin={loginWithEmail}
        onRegister={registerWithEmail}
        onGoogleLogin={loginWithGoogle}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <Header
        title={getTabTitle()}
        onMenuClick={() => setMenuOpen(true)}
        onLogout={logout}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={menuOpen}
        activeTab={activeTab}
        userEmail={user?.email}
        onClose={() => setMenuOpen(false)}
        onTabChange={handleTabChange}
      />

      {/* Contenido principal */}
      <div className="p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {dataLoading ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando datos...</p>
            </div>
          ) : (
            <>
              {activeTab === 'diario' && (
                <DailyView data={data} onSave={setEntry} onDelete={deleteEntry} />
              )}

              {activeTab === 'semanal' && (
                <WeeklyView data={data} />
              )}

              {activeTab === 'mensual' && (
                <MonthlyView data={data} />
              )}

              {activeTab === 'anual' && (
                <AnnualView data={data} />
              )}

              {activeTab === 'total' && (
                <TotalView data={data} />
              )}

              {activeTab === 'personalizado' && (
                <CustomView data={data} />
              )}

              {activeTab === 'backup' && (
                <SettingsView
                  data={data}
                  onRestore={replaceAllData}
                  onClearAll={clearAll}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
