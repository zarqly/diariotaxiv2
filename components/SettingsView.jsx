// src/components/SettingsView.jsx
import React, { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { exportDataToJSON, importDataFromJSON } from '../services/firebaseService';

export default function SettingsView({ data, onRestore, onClearAll }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleBackup = () => {
    exportDataToJSON(data, 'dietario-backup');
  };

  const handleRestore = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const restoredData = await importDataFromJSON(file);
        onRestore(restoredData);
        alert('Copia de seguridad restaurada correctamente');
      } catch (error) {
        alert('Error al restaurar la copia de seguridad: ' + error.message);
      }
    }
  };

  const handleDeleteAll = () => {
    onClearAll();
    setShowDeleteConfirm(false);
    alert('Todos los datos han sido eliminados');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="space-y-4">
        {/* Crear backup */}
        <button
          onClick={handleBackup}
          className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg font-semibold text-lg"
        >
          <Download size={24} />
          Crear Copia de Seguridad
        </button>

        {/* Restaurar backup */}
        <label className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg cursor-pointer font-semibold text-lg">
          <Upload size={24} />
          Restaurar Copia de Seguridad
          <input
            type="file"
            accept=".json"
            onChange={handleRestore}
            className="hidden"
          />
        </label>

        {/* Eliminar todos los datos */}
        <div className="border-t-2 border-gray-200 pt-6 mt-6">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg font-semibold text-lg"
          >
            <Trash2 size={24} />
            Eliminar Todos los Datos
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Confirmar Eliminación</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAll}
                className="flex-1 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 font-semibold shadow-lg"
              >
                Sí, eliminar todo
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 p-4 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 font-semibold shadow-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
