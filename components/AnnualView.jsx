// src/components/AnnualView.jsx
import React, { useState } from 'react';
import { getMonthName, formatDateISO, getCurrentYear, calculatePercentages } from '../utils/dateUtils';

export default function AnnualView({ data }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const annualData = [];

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
    let monthTotal = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, month, day);
      const dateKey = formatDateISO(date);
      if (data[dateKey]) {
        monthTotal += parseFloat(data[dateKey]);
      }
    }

    if (monthTotal > 0) {
      annualData.push({
        month: getMonthName(month),
        amount: monthTotal
      });
    }
  }

  const total = annualData.reduce((sum, month) => sum + month.amount, 0);
  const totals = calculatePercentages(total);

  const currentYear = getCurrentYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Selector de año */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Selecciona el año
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center font-semibold"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Título del año */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-white text-center">
          Año {selectedYear}
        </h3>
      </div>

      {/* Lista de meses con datos */}
      {annualData.length > 0 ? (
        <>
          <div className="space-y-2 mb-6">
            {annualData.map((month, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
              >
                <span className="font-semibold text-gray-900">{month.month}</span>
                <span className="font-bold text-blue-600 text-lg">{month.amount.toFixed(2)} €</span>
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
          No existen datos para el año {selectedYear}
        </div>
      )}
    </div>
  );
}
