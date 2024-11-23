// src/components/Navbar/Navbar.jsx
import { Link } from 'react-router-dom';
import { NavbarActions } from './NavbarActions';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>
        </div>
        <NavbarActions />
      </div>
    </nav>
  );
};

export default Navbar;