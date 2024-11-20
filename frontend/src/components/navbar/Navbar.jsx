// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const { user, logout } = useAuth(); // Usar useAuth para obtener user y logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>
        </div>
        {user ? (
          <div className="space-x-4">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/student-page" className="hover:text-gray-300">
              Student Page
            </Link>
            {user.role === 'teacher' && (
              <Link to="/teacher-dashboard" className="hover:text-gray-300">
                Teacher Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;