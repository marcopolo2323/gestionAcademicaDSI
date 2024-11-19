import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { api } from '../../utils/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/usuario/login', { 
        username, 
        password 
      });

      // Verificar si la respuesta contiene datos de usuario válidos
      if (response.data && response.data.usuario_id) {
        // Guardar token y usuario de manera segura
        const authToken = response.data.token || generateToken(response.data);
        
        setToken(authToken);
        setUser(response.data);

        // Intentar obtener datos adicionales del usuario
        await fetchAdditionalUserDetails(response.data);

        // Navegar al dashboard usando react-router
        navigate('/dashboard');
      } else {
        setError('Credenciales inválidas');
      }

    } catch (error) {
      console.error('Error de autenticación:', error);
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Genera un token básico si no viene desde el backend
  const generateToken = (user) => {
    return btoa(JSON.stringify({
      sub: user.usuario_id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    }));
  };

  // Obtener detalles adicionales del usuario
  const fetchAdditionalUserDetails = async (user) => {
    try {
      if (user.role === 'ROLE_STUDENT') {
        const studentResponse = await api.get(`/estudiante`, {
          params: { usuario_id: user.usuario_id }
        });
        setUser(prevUser => ({
          ...prevUser,
          studentData: studentResponse.data[0]
        }));
      } else if (user.role === 'ROLE_TEACHER') {
        const teacherResponse = await api.get(`/profesor`, {
          params: { usuario_id: user.usuario_id }
        });
        setUser(prevUser => ({
          ...prevUser,
          teacherData: teacherResponse.data[0]
        }));
      }
    } catch (error) {
      console.warn('Error al obtener datos adicionales:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        
        <div className="space-y-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;