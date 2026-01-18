// src/components/WeeklyView.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWeekDates, formatDate, formatDateISO, isWeekInFuture, getDayName, calculatePercentages } from '../utils/dateUtils';

export default function WeeklyView({ data }) {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const weekDates = getWeekDates(selectedWeek);
  const firstDay = formatDate(weekDates[0]);
  const lastDay = formatDate(weekDates[6]);

  const weekData = weekDates.map(date => {
    const dateKey = formatDateISO(date);
    return {
      date: formatDate(date),
      amount: data[dateKey] ? parseFloat(data[dateKey]) : 0,
      dayName: getDayName(date.getDay())
    };
  });

  const total = weekData.reduce((sum, day) => sum + day.amount, 0);
  const totals = calculatePercentages(total);

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    if (!isWeekInFuture(newDate)) {
      setSelectedWeek(newDate);
    }
  };

  const isNextWeekDisabled = isWeekInFuture(
    new Date(selectedWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Navegación semanal */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
          Navegación Semanal
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousWeek}
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md"
            title="Semana anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <h3 className="text-base font-semibold text-white text-center">
              Semana: {firstDay} - {lastDay}
            </h3>
          </div>

          <button
            onClick={handleNextWeek}
            disabled={isNextWeekDisabled}
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
            title="Semana siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Lista de días */}
      <div className="space-y-2 mb-6">
        {weekData.map((day, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 rounded-xl transition-all ${
              day.amount > 0
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div>
              <div className="font-semibold text-gray-900">{day.dayName}</div>
              <div className="text-sm text-gray-600">{day.date}</div>
            </div>
            <span className={`font-bold text-lg ${day.amount > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
              {day.amount > 0 ? `${day.amount.toFixed(2)} €` : '-'}
            </span>
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
    </div>
  );
}
