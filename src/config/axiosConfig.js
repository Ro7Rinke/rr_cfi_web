import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Defina aqui sua URL base
  timeout: 10000, // (opcional) tempo limite para requisições em milissegundos
});

export default axiosInstance;