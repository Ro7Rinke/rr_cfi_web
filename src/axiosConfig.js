import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8010', // Defina aqui sua URL base
  timeout: 10000, // (opcional) tempo limite para requisições em milissegundos
});

export default axiosInstance;