import axios from 'axios';

// Store reference
let storeRef = null;

// Function to initialize store reference
export const initializeStore = (store) => {
  storeRef = store;
};

const isDevelopment = import.meta.env.DEV; // Vite's way to check environment

// Create axios instance with enhanced configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  }
});

// Enhanced request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storeRef?.getState()?.token;
    
    if (isDevelopment) {
      console.log('🚀 Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
        hasToken: !!token
      });
    }
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      }
    });

    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (storeRef?.getState()?.logout) {
            storeRef.getState().logout();
            window.location.href = '/login';
          }
          break;
        case 500:
          console.error('🔥 Server Error Details:', error.response.data);
          break;
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout');
    } else if (!error.response) {
      console.error('🌐 Network Error');
    }

    return Promise.reject(error);
  }
);

// Rest of the code remains the same...

export const handleRequest = async (request, onSuccess, onError) => {
  try {
    const response = await request();
    
    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(response.data);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Error en la solicitud';

    console.error('🔴 Request Handler Error:', {
      message: errorMessage,
      originalError: error,
      response: error.response?.data,
      status: error.response?.status
    });

    if (onError && typeof onError === 'function') {
      onError(errorMessage);
    }

    throw new Error(errorMessage);
  }
};

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
  
  delete: async (endpoint, config = {}) => {
    return handleRequest(() => api.delete(endpoint, config));
  }
};

export { api };
export default api;