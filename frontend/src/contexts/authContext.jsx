// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import PropTypes from 'prop-types';

// Crear el contexto de autenticación
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para verificar y establecer el usuario autenticado
  const checkAndSetAuthUser = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    setIsLoading(true);
    
    if (storedToken && storedUser) {
      try {
        // Simplemente configurar el token en los headers
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error al restaurar la sesión', error);
        logout();
      }
    }
    
    setIsLoading(false);
  }, []);

  // Hook para verificar autenticación al cargar
  useEffect(() => {
    checkAndSetAuthUser();
  }, [checkAndSetAuthUser]);

  // Función de login
  // AuthContext.jsx
const login = async (credentials) => {
  try {
    const response = await api.post('/usuario/login', credentials);
    
    if (response.data && response.data.usuario_id) {
      const user = {
        id: response.data.usuario_id,
        username: response.data.username,
        role: response.data.role,
        token: response.data.token
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);

      // Establecer encabezados de autorización
      api.defaults.headers['Authorization'] = `Bearer ${user.token}`;

      // Actualizar estado del usuario
      setUser(user);

      return user;
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error de inicio de sesión', error);
    throw error;
  }
};

  // Función de logout
  const logout = () => {
    // Eliminar datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Eliminar encabezados de autorización
    delete api.defaults.headers['Authorization'];

    // Limpiar estado del usuario
    setUser(null);
  };

  // Valor del contexto
  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop types para el proveedor
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}; 