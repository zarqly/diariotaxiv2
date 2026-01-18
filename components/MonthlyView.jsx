// src/components/MonthlyView.jsx
import React, { useState } from 'react';
import { getMonthName, formatDate, formatDateISO, getCurrentYear, calculatePercentages } from '../utils/dateUtils';

export default function MonthlyView({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const monthData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(selectedYear, selectedMonth, day);
    const dateKey = formatDateISO(date);
    if (data[dateKey]) {
      monthData.push({
        date: formatDate(date),
        amount: parseFloat(data[dateKey])
      });
    }
  }

  const total = monthData.reduce((sum, day) => sum + day.amount, 0);
  const totals = calculatePercentages(total);

  const currentYear = getCurrentYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Selectores de mes y año */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mes</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{getMonthName(i)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Año</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Título del mes */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-white text-center">
          {getMonthName(selectedMonth)} de {selectedYear}
        </h3>
      </div>

      {/* Lista de días con datos */}
      {monthData.length > 0 ? (
        <>
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {monthData.map((day, index) => (
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
              <span className="font-bold text-black text-xl">{totals.total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">60%:</span>
              <span className="font-bold text-red-600 text-lg">{totals.sixty.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">40%:</span>
              <span className="font-bold text-blue-600 text-lg">{totals.forty.toFixed(2)} €</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500 font-medium">
          No existen datos para {getMonthName(selectedMonth)} de {selectedYear}
        </div>
      )}
    </div>
  );
}
