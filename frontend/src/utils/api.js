import axios from 'axios';
import useStore from '../store/useStore';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitudes para añadir token de autorización
api.interceptors.request.use(
  (config) => {
    // Obtener el token del estado de Zustand
    const token = useStore.getState().token;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas para manejar errores de autorización
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Usar logout del store si el token es inválido
      const logout = useStore.getState().logout;
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Función genérica para manejar solicitudes
export const handleRequest = async (request, onSuccess, onError) => {
  try {
    const response = await request();
    
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });

    if (onSuccess) {
      onSuccess(response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });

    // Manejar diferentes tipos de errores
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Error en la solicitud';

    if (onError) {
      onError(errorMessage);
    }

    if (error.response) {
      // El servidor respondió con un estado de error
      throw new Error(errorMessage);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió al configurar la solicitud
      throw new Error('Error al realizar la petición');
    }
  }
};

// Métodos CRUD genéricos
export const apiService = {
  get: async (endpoint, params = {}) => {
    return handleRequest(() => api.get(endpoint, { params }));
  },
  
  post: async (endpoint, data, config = {}) => {
    return handleRequest(() => api.post(endpoint, data, config));
  },
  
  put: async (endpoint, data, config = {}) => {
    return handleRequest(() => api.put(endpoint, data, config));
  },
  
  patch: async (endpoint, data, config = {}) => {
    return handleRequest(() => api.patch(endpoint, data, config));
  },
  
  delete: async (endpoint, config = {}) => {
    return handleRequest(() => api.delete(endpoint, config));
  }
};

// Exportaciones
export { api };
export default api;