// src/components/CustomView.jsx
import React, { useState } from 'react';
import { formatDate, getTodayISO, calculatePercentages } from '../utils/dateUtils';

export default function CustomView({ data }) {
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const getCustomData = () => {
    if (!customStartDate || !customEndDate) return null;

    const start = new Date(customStartDate);
    const end = new Date(customEndDate);
    const customData = [];

    Object.keys(data).forEach(dateKey => {
      const date = new Date(dateKey);
      if (date >= start && date <= end) {
        customData.push({
          date: formatDate(date),
          amount: parseFloat(data[dateKey])
        });
      }
    });

    customData.sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return dateA.localeCompare(dateB);
    });

    const total = customData.reduce((sum, day) => sum + day.amount, 0);
    const totals = calculatePercentages(total);

    return { customData, ...totals };
  };

  const result = getCustomData();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Selectores de fechas */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha inicio
          </label>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha fin
          </label>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            max={getTodayISO()}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Resultados */}
      {!result ? (
        <div className="text-center py-12 text-gray-500">
          Selecciona un rango de fechas
        </div>
      ) : result.customData.length > 0 ? (
        <>
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {result.customData.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
              >
                <span className="font-semibold text-gray-900">{day.date}</span>
                <span className="font-bold text-blue-600 text-lg">{day.amount.toFixed(2)} €</span>
              </div>
            ))}
          </div>

          {/* Resumen de totales */}
          <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
            <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="font-bold text-black text-xl">{result.total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">60%:</span>
              <span className="font-bold text-red-600 text-lg">{result.sixty.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">40%:</span>
              <span className="font-bold text-blue-600 text-lg">{result.forty.toFixed(2)} €</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No hay datos en el rango seleccionado
        </div>
      )}
    </div>
  );
}
