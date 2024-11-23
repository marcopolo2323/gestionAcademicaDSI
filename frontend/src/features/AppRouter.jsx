import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Home from './../pages/home/Home';
import LoginPage from './../pages/loginPage/LoginPage';
import RegisterPage from './../pages/registerPage/RegisterPage';
import Dashboard from './../pages/dashboard/DashBoard';
import StudentPage from './../pages/studentPage/StudentPage';
import TeacherDashboard from './../components/teacherDashboard/TeacherDashboard';
import useStore from '../store/useStore';
import MatriculaForm from '../components/matriculaForm/MatriculaForm';

const PrivateRoute = ({ children, role }) => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      logout();
      navigate('/login');
    }
  }, [user, logout, navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Flexible role validation
  if (role) {
    const normalizedRole = `ROLE_${role.toUpperCase()}`;
    if (user.role !== normalizedRole) {
      // Puedes personalizar esto para mostrar un mensaje de error o redirigir
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

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
      <Route 
        path="/matricula" 
        element={
          <PrivateRoute role="TEACHER">
            <MatriculaForm />
          </PrivateRoute>
        } 
      />
      {/* Opcional: Ruta de página no encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;