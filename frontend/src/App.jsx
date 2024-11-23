// App.jsx
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AppRouter from './features/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;