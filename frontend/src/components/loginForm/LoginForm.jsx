import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../utils/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  useEffect(() => {
    if (token) {
      window.location.href = '/dashboard';
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
