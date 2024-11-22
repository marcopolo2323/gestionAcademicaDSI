import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await login({ username, password });

      // Navegar según el rol
      if (user.role === 'ROLE_STUDENT') {
        navigate('/student');
      } else if (user.role === 'ROLE_TEACHER') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      
      <section>
        <form onSubmit={handleLogin} className="form-contend">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
          
          <div className="space-y-2">
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                className="login form input"
                required
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="login form input"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login section form button"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default LoginForm;