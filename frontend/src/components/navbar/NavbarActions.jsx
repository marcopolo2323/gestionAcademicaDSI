import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import './navbaraction.css';

export const NavbarActions = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navegador">
      <div className="menu">
        {!user ? (
          <>
            <Link to="/login" className="link-nav">
              Login
            </Link>
            <Link to="/register" className="link-nav">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="link-nav">
              Dashboard
            </Link>
            <Link to="/student" className="link-nav">
              Student Page
            </Link>
            {user.role === 'ROLE_TEACHER' && (
              <Link to="/teacher-dashboard" className="link-nav">
                Teacher Dashboard
              </Link>
            )}
            <button 
              onClick={handleLogout} 
              className="link-nav text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};