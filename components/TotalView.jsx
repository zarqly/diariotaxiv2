// src/components/TotalView.jsx
import React from 'react';
import { calculatePercentages } from '../utils/dateUtils';

export default function TotalView({ data }) {
  const allYears = {};

  Object.keys(data).forEach(dateKey => {
    const year = dateKey.split('-')[0];
    if (!allYears[year]) {
      allYears[year] = 0;
    }
    allYears[year] += parseFloat(data[dateKey]);
  });

  const yearsData = Object.keys(allYears)
    .sort((a, b) => b - a)
    .map(year => ({
      year,
      amount: allYears[year]
    }));

  const total = yearsData.reduce((sum, year) => sum + year.amount, 0);
  const totals = calculatePercentages(total);
  const totalDays = Object.keys(data).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {yearsData.length > 0 ? (
        <>
          {/* Total de días */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <p className="text-center">
              <span className="font-semibold text-gray-700">Total de días: </span>
              <span className="font-bold text-blue-600 text-lg">{totalDays}</span>
            </p>
          </div>

          {/* Lista de años */}
          <div className="space-y-2 mb-6">
            {yearsData.map((year, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
              >
                <span className="font-semibold text-gray-900">{year.year}</span>
                <span className="font-bold text-blue-600 text-lg">{year.amount.toFixed(2)} €</span>
              </div>
            ))}
          </div>

          {/* Resumen de totales */}
          <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
            <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
              <span className="font-semibold text-gray-700">Total General:</span>
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
        <div className="text-center py-12 text-gray-500">
          No hay datos registrados
        </div>
      )}
    </div>
  );
}
