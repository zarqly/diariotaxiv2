// src/components/DailyView.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Check, Edit2, Trash2, X } from 'lucide-react';
import { formatDateISO, getTodayISO, calculatePercentages } from '../utils/dateUtils';

export default function DailyView({ data, onSave, onDelete }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [tempAmount, setTempAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  // Actualizar cuando cambia la fecha o los datos
  useEffect(() => {
    const dateKey = formatDateISO(selectedDate);
    const amount = data[dateKey] || '';
    setCurrentAmount(amount);
    setIsEditing(false);
    setTempAmount('');
  }, [selectedDate, data]);

  const handleAmountChange = (value) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === '' || regex.test(value)) {
      setTempAmount(value);
    }
  };

  const handleSave = () => {
    if (tempAmount && !isNaN(parseFloat(tempAmount))) {
      const dateKey = formatDateISO(selectedDate);
      const formattedValue = parseFloat(tempAmount).toFixed(2);
      onSave(dateKey, formattedValue);
      setIsEditing(false);
      setTempAmount('');
    }
  };

  const handleEdit = () => {
    setTempAmount(currentAmount);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempAmount('');
  };

  const handleDeleteClick = () => {
    const dateKey = formatDateISO(selectedDate);
    onDelete(dateKey);
  };

  const totals = currentAmount ? calculatePercentages(parseFloat(currentAmount)) : null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Selector de fecha */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Selecciona una fecha</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={formatDateISO(selectedDate)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            max={getTodayISO()}
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <button
            onClick={() => setSelectedDate(new Date())}
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md"
            title="Ir a hoy"
          >
            <Calendar size={24} />
          </button>
        </div>
      </div>

      {/* Formulario de cantidad */}
      <div className="space-y-4">
        {!currentAmount && !isEditing ? (
          // Vista: Sin datos
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700">Cantidad (€)</label>
            <input
              type="text"
              inputMode="decimal"
              value={tempAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
              placeholder="0.00"
            />
            <button
              onClick={handleSave}
              disabled={!tempAmount}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
            >
              Introducir
            </button>
          </div>
        ) : isEditing ? (
          // Vista: Editando
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700">Cantidad (€)</label>
            <input
              type="text"
              inputMode="decimal"
              value={tempAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
              placeholder="0.00"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!tempAmount}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-4 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          // Vista: Con datos
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700">Cantidad</label>
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
              <span className="text-3xl font-bold text-gray-900">{currentAmount} €</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Edit2 size={20} />
                Editar
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex-1 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Borrar
              </button>
            </div>
          </div>
        )}

        {/* Resumen de totales */}
        {currentAmount && !isEditing && totals && (
          <div className="mt-6 space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
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
        )}
      </div>
    </div>
  );
}
