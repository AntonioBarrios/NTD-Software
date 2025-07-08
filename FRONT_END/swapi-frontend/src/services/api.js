import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Ajusta según tu backend

export const getPlanets = (filters = {}) => {
  // Implementación existente
};

export const createPlanet = (planetData) => {
  return axios.post(`${API_BASE_URL}/planetas/`, planetData);
};

export const updatePlanet = (id, planetData) => {
  return axios.put(`${API_BASE_URL}/planetas/${id}/`, planetData);
};

export const deletePlanet = (id) => {
  return axios.delete(`${API_BASE_URL}/planetas/${id}/`);
};