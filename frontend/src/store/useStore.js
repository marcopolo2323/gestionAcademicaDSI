// useStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../utils/api';

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      roles: {},
      
      updateRoleRoutes: (roleRoutes) => {
        set({ roles: roleRoutes });
      },

      getRouteByRole: (role) => {
        const defaultRoutes = {
          'ROLE_ADMIN': '/admin-dashboard',
          'ROLE_TEACHER': '/teacher-dashboard',
          'ROLE_STUDENT': '/student'
        };
        
        const store = get();
        // Primero intenta obtener del store, si no existe usa la ruta predeterminada
        const roleRoute = store.roles[role] || defaultRoutes[role];
        return roleRoute || '/dashboard';
      },

      login: async (credentials) => {
        try {
          // Validación básica de credenciales
          if (!credentials.username || !credentials.password) {
            throw new Error('Usuario y contraseña son requeridos');
          }

          console.log('Intentando login con:', {
            username: credentials.username,
            passwordLength: credentials.password.length
          });

          const response = await api.post('/usuario/login', credentials);
          
          console.log('Respuesta del servidor:', {
            status: response.status,
            headers: response.headers,
            data: response.data ? {
              ...response.data,
              token: response.data.token ? '[PRESENT]' : '[MISSING]'
            } : null
          });

          if (!response.data) {
            throw new Error('No se recibieron datos del servidor');
          }

          const { token, usuario_id, username, role } = response.data;

          // Validación de datos requeridos
          if (!token) throw new Error('Token no recibido del servidor');
          if (!role) throw new Error('Rol no recibido del servidor');
          if (!usuario_id) throw new Error('ID de usuario no recibido');
          if (!username) throw new Error('Nombre de usuario no recibido');

          const userData = {
            id: usuario_id,
            username,
            role,
            token
          };

          // Configurar el token en los headers de axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          console.log('Login exitoso, actualizando estado con:', {
            id: usuario_id,
            username,
            role
          });

          set({
            user: userData,
            token
          });

          return userData;
        } catch (error) {
          console.error('Error detallado en login:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            statusText: error.response?.statusText
          });

          // Mejorar el mensaje de error basado en el tipo de error
          let errorMessage = 'Error al iniciar sesión';
          
          if (error.response) {
            switch (error.response.status) {
              case 400:
                errorMessage = 'Credenciales inválidas';
                break;
              case 401:
                errorMessage = 'Usuario o contraseña incorrectos';
                break;
              case 500:
                errorMessage = 'Error en el servidor. Por favor, intente más tarde';
                break;
              default:
                errorMessage = error.response.data?.message || 'Error desconocido';
            }
          }

          throw new Error(errorMessage);
        }
      },

      logout: () => {
        console.log('Cerrando sesión...');
        
        // Limpiar headers antes de eliminar el token
        delete api.defaults.headers.common['Authorization'];
        
        set({
          user: null,
          token: null
        });
        
        localStorage.removeItem('token');
        console.log('Sesión cerrada exitosamente');
      },

      hasRole: (roleToCheck) => {
        const store = get();
        return store.user?.role === roleToCheck;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        roles: state.roles
      })
    }
  )
);

export default useStore;