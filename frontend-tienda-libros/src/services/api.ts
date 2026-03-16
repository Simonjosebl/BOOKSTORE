import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8097/api', // Reemplaza con tu URL 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;