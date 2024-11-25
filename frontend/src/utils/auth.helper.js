import useStore from '../store/useStore';
import api from './api';

export const authHelper = {
  login: async (credentials) => {
    try {
      console.log('🔐 Intentando login con:', credentials);
      
      const response = await api.post('/usuario/login', credentials);
      
      console.log('🟢 Respuesta de login:', response.data);
      
      if (!response.data.token) {
        throw new Error('Token de autenticación no proporcionado');
      }

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      // Guardar el usuario en el store
      const user = {
        id: response.data.usuario_id,
        username: response.data.username,
        role: response.data.role,
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
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  
  logout: () => {
    localStorage.removeItem('token');
    const store = useStore.getState();
    store.logout();
    window.location.href = '/login';
  },
  getToken: () => localStorage.getItem('token')

  // validateToken: async () => {
  //   const store = useStore.getState();
    
  //   if (typeof store.validateToken === 'function') {
  //     return await store.validateToken();
  //   } else {
  //     console.error('Método validateToken no encontrado');
  //     return false;
  //   }
  // }
};

export default authHelper;