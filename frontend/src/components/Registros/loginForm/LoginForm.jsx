// Importar módulos externos
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importar módulos internos
import { authHelper } from '../../../utils/auth.helper';
import useStore from '../../../store/useStore';

// Componente principal
const LoginForm = () => {
  // Estados locales
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Navegación y estados globales
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const user = useStore((state) => state.user);

  // Efecto para redirigir según el rol del usuario
  useEffect(() => {
    if (user) {
      const routes = {
        ROLE_STUDENT: '/student',
        ROLE_TEACHER: '/teacher-dashboard',
        ROLE_ADMIN: '/admin-dashboard',
      };

      const destination = routes[user.role] || '/dashboard';
      navigate(destination);
    }
  }, [user, navigate]);

  // Manejador del evento de login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const userData = await authHelper.login({
        username: username.trim(),
        password,
      });
  
      // Directly pass userData to login
      login(userData);
  
      setUsername('');
      setPassword('');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Error al iniciar sesión';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          {/* Campo de usuario */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="username"
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Botón de login */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          {/* Enlace para recuperar contraseña */}
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
