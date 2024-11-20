// AppRouter.js
import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './../pages/home/Home';
import LoginPage from './../pages/loginPage/LoginPage';
import RegisterPage from './../pages/registerPage/RegisterPage';
import Dashboard from './../pages/dashboard/DashBoard';
import StudentPage from './../pages/studentPage/StudentPage';
import TeacherDashboard from './../components/teacherDashboard/TeacherDashboard';
import { useAuth } from '../contexts/authContext'; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Validación de roles más flexible
  if (role) {
    const normalizedRole = role.toUpperCase();
    const userRole = user.role ? user.role.replace('ROLE_', '').toUpperCase() : '';
    
    if (userRole !== normalizedRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Añadir PropTypes para PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student" 
        element={
          <PrivateRoute role="STUDENT">
            <StudentPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/teacher-dashboard" 
        element={
          <PrivateRoute role="TEACHER">
            <TeacherDashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter;