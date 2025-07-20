import axios from 'axios';
import { API_BASE_URL } from '../config'; 

const API_URL = `${API_BASE_URL}/usuario`;

export const cadastrar = async (usuario) => {
  const response = await axios.post(`${API_URL}/register`, usuario);
  const { token } = response.data;
  localStorage.setItem('token', token);
  return response.data;
};

export const login = async (credenciais) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credenciais);

    const { token, idUsuario, nome, tipoUsuario } = response.data;

    // Armazenar no localStorage (síncrono)
    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(idUsuario));
    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('tipoUsuario', tipoUsuario);

    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw new Error('E-mail ou senha inválidos');
  }
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('nomeUsuario');
  localStorage.removeItem('tipoUsuario');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
