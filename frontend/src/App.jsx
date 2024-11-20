// App.jsx
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AppRouter from './features/AppRouter';
import { AuthProvider } from './contexts/authContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container">
          <Navbar />
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;