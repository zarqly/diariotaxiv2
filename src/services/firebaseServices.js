// src/services/firebaseService.js
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Carga los datos del dietario de un usuario
 */
export const loadUserData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId, 'dietario', 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().entries || {};
    }
    return {};
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

/**
 * Guarda los datos del dietario de un usuario
 */
export const saveUserData = async (userId, data) => {
  try {
    const docRef = doc(db, 'users', userId, 'dietario', 'data');
    await setDoc(docRef, {
      entries: data,
      lastUpdated: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

/**
 * Exporta los datos a JSON para backup
 */
export const exportDataToJSON = (data, filename = 'dietario-backup') => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Importa datos desde un archivo JSON
 */
export const importDataFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Error al parsear el archivo JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsText(file);
  });
};
