import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export const NavbarActions = () => {
  const { user, logout } = useStore(); // Destructuring logout directly
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout method from store
    navigate('/login'); // Redirect to login page
  };

  if (!user) {
    return (
      <div className="flex space-x-4">
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
        <Link to="/register" className="text-green-500 hover:text-green-700">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
        Dashboard
      </Link>
      <Link to="/student" className="text-green-500 hover:text-green-700">
        Student Page
      </Link>
      {user.role === 'ROLE_TEACHER' && (
        <Link to="/teacher-dashboard" className="text-purple-500 hover:text-purple-700">
          Teacher Dashboard
        </Link>
      )}
      <button 
        onClick={handleLogout} 
        className="text-red-500 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  );
};