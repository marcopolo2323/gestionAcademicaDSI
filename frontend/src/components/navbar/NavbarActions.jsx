import { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Importar los estilos

export const NavbarActions = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState); // Toggle the menu open/close
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-x-4 md:space-x-0">
      {/* Botón de menú hamburguesa visible solo en pantallas pequeñas */}
      <div className={styles.navbarToggle} onClick={toggleMenu}>
        <span className="text-white">☰</span> {/* Icono de menú hamburguesa */}
      </div>

      {/* Menú de navegación */}
      <div className={`${styles.navbarMenu} ${menuOpen ? 'active' : ''}`}>
        {/* Si el usuario no está autenticado, mostramos el enlace de Login */}
        {!user ? (
          <Link to="/login" className={styles.navbarLink}>
            Login
          </Link>
        ) : (
          <>
           

            {/* Enlaces de administrador */}
            {user.role === 'ROLE_ADMIN' && (
              <>
                <Link to="/carrera" className={styles.navbarAdminLink}>
                  Manage Career
                </Link>
                <Link to="/plan-estudios" className={styles.navbarAdminLink}>
                  Manage Study Plan
                </Link>
                <Link to="/cursos" className={styles.navbarAdminLink}>
                  Manage Courses
                </Link>
                <Link to="/matricula" className={styles.navbarAdminLink}>
                  Manage Enrollment
                </Link>
                <Link to="/horario" className={styles.navbarAdminLink}>
                  Manage Schedule
                </Link>
                
                <Link to="/register" className={styles.navbarAdminLink}>
                  Registro
                </Link>
              </>
            )}

            {user.role === 'ROLE_TEACHER' && (
                <Link to="/asistencia" className={styles.navbarAdminLink}>
                Manage Attendance
              </Link>
            )}

            {/* Botón de Logout siempre visible */}
            <button onClick={handleLogout} className={styles.navbarButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
