import { Link, useLocation } from 'react-router-dom';
import { NavbarActions } from './NavbarActions';
import styles from './Navbar.module.css'; // Importar los estilos

const Navbar = () => {
  const location = useLocation(); // Obtener la ubicación actual de la página

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div>
          {/* Renderizamos el enlace de Home solo si no estamos ya en la página Home */}
          {location.pathname !== '/' && (
            <Link to="/" className={styles.navbarLink}>
              Home
            </Link>
          )}
        </div>

        {/* Renderizamos NavbarActions siempre */}
        <NavbarActions />
      </div>
    </nav>
  );
};

export default Navbar;
