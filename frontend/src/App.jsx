// App.jsx
import { useEffect, useCallback, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import api from './utils/api';
import AppRouter from './features/AppRouter';

const App = () => {
  const [user, setUser] = useState(null);
  const [, setToken] = useState(null);

  const checkAndSetAuthUser = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
      try {
        const response = await api.get('/me');
        setUser(response.data);
        setToken(storedToken);
      } catch (error) {
        console.error('Error al obtener el usuario autenticado', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  useEffect(() => {
    checkAndSetAuthUser();
  }, [checkAndSetAuthUser]);

  return (
    <div className="container">
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }} />
      <AppRouter user={user} />
    </div>
  );
};

export default App;