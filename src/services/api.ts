import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'Erro desconhecido',
      status: error.response?.status
    };
    return Promise.reject(customError);
  }
);
