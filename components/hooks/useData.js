// src/hooks/useData.js
import { useReducer, useEffect } from 'react';
import { loadUserData, saveUserData } from '../services/firebaseService';

// Actions
const ACTIONS = {
  LOAD_DATA: 'LOAD_DATA',
  SET_ENTRY: 'SET_ENTRY',
  DELETE_ENTRY: 'DELETE_ENTRY',
  CLEAR_ALL: 'CLEAR_ALL',
  SET_LOADING: 'SET_LOADING'
};

// Reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_DATA:
      return { ...state, entries: action.payload, loading: false };
    
    case ACTIONS.SET_ENTRY:
      return {
        ...state,
        entries: { ...state.entries, [action.payload.date]: action.payload.amount }
      };
    
    case ACTIONS.DELETE_ENTRY:
      const newEntries = { ...state.entries };
      delete newEntries[action.payload];
      return { ...state, entries: newEntries };
    
    case ACTIONS.CLEAR_ALL:
      return { ...state, entries: {} };
    
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};

// Hook personalizado
export const useData = (userId) => {
  const [state, dispatch] = useReducer(dataReducer, {
    entries: {},
    loading: true
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    if (userId) {
      loadUserData(userId)
        .then(data => {
          dispatch({ type: ACTIONS.LOAD_DATA, payload: data });
        })
        .catch(error => {
          console.error('Error loading data:', error);
          dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        });
    }
  }, [userId]);

  // Guardar datos en Firestore cada vez que cambian
  useEffect(() => {
    if (userId && !state.loading) {
      saveUserData(userId, state.entries).catch(error => {
        console.error('Error saving data:', error);
      });
    }
  }, [state.entries, userId, state.loading]);

  const setEntry = (date, amount) => {
    dispatch({
      type: ACTIONS.SET_ENTRY,
      payload: { date, amount }
    });
  };

  const deleteEntry = (date) => {
    dispatch({
      type: ACTIONS.DELETE_ENTRY,
      payload: date
    });
  };

  const clearAll = () => {
    dispatch({ type: ACTIONS.CLEAR_ALL });
  };

  const replaceAllData = (newData) => {
    dispatch({ type: ACTIONS.LOAD_DATA, payload: newData });
  };

  return {
    data: state.entries,
    loading: state.loading,
    setEntry,
    deleteEntry,
    clearAll,
    replaceAllData
  };
};
