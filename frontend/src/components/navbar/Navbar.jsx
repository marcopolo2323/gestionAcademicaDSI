// src/components/Navbar/Navbar.jsx
import { Link } from 'react-router-dom';
import { NavbarActions } from './NavbarActions';

const Navbar = () => {
  return (
    <nav className="navegador">
      <div className="menu">
        <div>
          <Link to="/" className="link-nav">
            Home
          </Link>
        </div>
        <NavbarActions />
      </div>
    </nav>
  );
};

export default Navbar;