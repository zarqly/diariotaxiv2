// src/utils/dateUtils.js

/**
 * Formatea una fecha a DD/MM/YYYY
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea una fecha a YYYY-MM-DD (formato ISO)
 */
export const formatDateISO = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

/**
 * Obtiene la fecha actual en formato ISO
 */
export const getTodayISO = () => {
  return formatDateISO(new Date());
};

/**
 * Obtiene el año actual
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/**
 * Obtiene los 7 días de una semana (Lunes a Domingo)
 */
export const getWeekDates = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    weekDates.push(currentDate);
  }
  return weekDates;
};

/**
 * Verifica si una semana es futura
 */
export const isWeekInFuture = (weekDate) => {
  const weekDates = getWeekDates(weekDate);
  const firstDayOfWeek = weekDates[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  firstDayOfWeek.setHours(0, 0, 0, 0);
  return firstDayOfWeek > today;
};

/**
 * Obtiene el nombre del mes
 */
export const getMonthName = (monthIndex) => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return monthNames[monthIndex];
};

/**
 * Obtiene los nombres de los días de la semana
 */
export const getDayName = (dayIndex) => {
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  return dayNames[dayIndex === 0 ? 6 : dayIndex - 1];
};

/**
 * Calcula porcentajes de un total
 */
export const calculatePercentages = (total) => {
  return {
    total: total,
    sixty: total * 0.6,
    forty: total * 0.4
  };
};
