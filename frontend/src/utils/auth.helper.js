import useStore from '../store/useStore';
import api from './api';

export const authHelper = {
  login: async (credentials) => {
    try {
      console.log('🔐 Intentando login con:', credentials);
      
      const response = await api.post('/usuario/login', credentials);
      
      console.log('🟢 Respuesta de login:', response.data);
      
      const user = {
        id: response.data.usuario_id,
        username: response.data.username,
        role: response.data.role || 'ROLE_USER',
        token: response.data.token
      };
      
      console.log('👤 Usuario a almacenar:', user);
      
      if (!user.token) {
        throw new Error('Token de autenticación no proporcionado');
      }

      // Pass user data back to be handled by the caller
      return user;
    } catch (error) {
      console.error('🔴 Error completo de login:', error);
      
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Error al iniciar sesión';
      
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    const store = useStore.getState();
    store.logout();
    window.location.href = '/login';
  },

  validateToken: async () => {
    const store = useStore.getState();
    
    if (typeof store.validateToken === 'function') {
      return await store.validateToken();
    } else {
      console.error('Método validateToken no encontrado');
      return false;
    }
  }
};

export default authHelper;