import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // L'URL de base de votre API backend
  timeout: 10000, // Timeout en millisecondes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour les requêtes
instance.interceptors.request.use(
  (config) => {
    // Vous pouvez ajouter ici des headers supplémentaires si nécessaire
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Erreur Axios:', error);
    return Promise.reject(error);
  }
);

export default instance;
