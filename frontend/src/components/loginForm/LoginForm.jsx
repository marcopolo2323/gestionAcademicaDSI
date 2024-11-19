import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../utils/api'; // Aunque no se utiliza, lo dejé por si es necesario más adelante
import './LoginForm.css'; // Importa el archivo CSS

const LoginForm = () => {
  // Estados para el formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Acceso a la tienda global
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);

  // Manejo del envío del formulario
  const handleLogin = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error en la autenticación: ${response.statusText}`);
      }

      const data = await response.json();
      // Guardar el usuario y el token en el estado global
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      alert('Error al iniciar sesión. Por favor, intenta de nuevo.'); // Mensaje de error al usuario
    }
  };

  // Redirección si el token es válido
  useEffect(() => {
    if (token) {
      window.location.href = '/dashboard'; // Redirige al dashboard
    }
  }, [token]);

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

