import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-lg font-bold">
            Home
          </a>
        </div>
        {user ? (
          <div className="space-x-4">
            <a href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </a>
            <a href="/student-page" className="hover:text-gray-300">
              Student Page
            </a>
            {user.role === 'teacher' && (
              <a href="/teacher-dashboard" className="hover:text-gray-300">
                Teacher Dashboard
              </a>
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
            <a href="/login" className="hover:text-gray-300">
              Login
            </a>
            <a href="/register" className="hover:text-gray-300">
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;