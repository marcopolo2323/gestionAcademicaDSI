import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../utils/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);

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
        // Aquí puedes guardar el usuario y el token en el estado global
        setUser(data.user);
        setToken(data.token);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
        alert('Error al iniciar sesión. Por favor, intenta de nuevo.'); // Muestra un mensaje al usuario
    }
};

  useEffect(() => {
    if (token) {
      window.location.href = '/dashboard';  // Redirige si el token es válido
    }
  }, [token]);

  return (
    <form onSubmit={handleLogin}>
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

