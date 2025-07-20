import axios from 'axios';
import { API_BASE_URL } from '../config';

export const api = axios.create({
  baseURL: `${API_BASE_URL}`, // ou seu IP local/servidor
});

// Adiciona o token a cada requisição
api.interceptors.request.use(
  (config) => {
    // localStorage é síncrono e não precisa de await
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
