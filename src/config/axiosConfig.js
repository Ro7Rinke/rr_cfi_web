import axios from 'axios';
import store from '../redux/store'
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Defina aqui sua URL base
  timeout: 10000, // (opcional) tempo limite para requisições em milissegundos
});

// Usando um interceptor para adicionar o token antes de cada requisição
axiosInstance.interceptors.request.use((config) => {
  const authToken = JSON.parse(Cookies.get('authToken') ?? null)
  if(authToken && authToken.access){
    config.headers.Authorization = `Bearer ${authToken.access}`;
  }
  // const token = store.getState().authToken.access; // Acesse o estado global
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;