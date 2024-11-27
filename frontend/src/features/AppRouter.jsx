import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Home from './../pages/home/Home';
import LoginPage from './../pages/loginPage/LoginPage';
import StudentPage from './../pages/studentPage/StudentPage';
import TeacherDashboard from './../components/teacherDashboard/TeacherDashboard';
import useStore from '../store/useStore';
import CarreraForm from '../components/Registros/carreraForm/CarreraForm';
import AsistenciaForm from '../components/Registros/asistenciaForm/AsistenciaForm';
// import CalificacionForm from '../components/Registros/calificacionForm/CalificacionForm';
import CursoForm from '../components/Registros/cursosForm/CursosForm';
import PlanEstudioForm from '../components/Registros/planDeEstudioForm/PlanEstudioForm';
import MatriculaManagement from '../components/Registros/matriculaForm/MatriculaForm';
import HorarioForm from '../components/Registros/horarioForm/HorarioForm';
import AdminPage from '../pages/adminPage/AdminPage';
import RegisterForm from '../components/Registros/registerForm/RegisterForm';

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

  // Validación de roles
  if (role && user.role !== `ROLE_${role.toUpperCase()}`) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Rutas para Admin */}
      <Route 
        path='/carrera' 
        element={ 
          <PrivateRoute role="ADMIN">
            <CarreraForm />
          </PrivateRoute>
        } 
      />
      <Route 
        path='/plan-estudios' 
        element={
          <PrivateRoute role="ADMIN">
            <PlanEstudioForm />
          </PrivateRoute>
        }
      />
      <Route 
        path='/cursos' 
        element={
          <PrivateRoute role="ADMIN">
            <CursoForm />
          </PrivateRoute>
        }
      />
      <Route 
        path='/matricula' 
        element={
          <PrivateRoute role="ADMIN">
            <MatriculaManagement />
          </PrivateRoute>
        }
      />
      <Route 
        path='/horario' 
        element={
          <PrivateRoute role="ADMIN">
            <HorarioForm />
          </PrivateRoute>
        }
      />
      <Route 
        path='/register' 
        element={
          <PrivateRoute role="ADMIN">
            <RegisterForm />
          </PrivateRoute>
        }
      />

      {/* Rutas para el profesor */}
      <Route 
        path='/asistencia' 
        element={
          <PrivateRoute role="TEACHER">
            <AsistenciaForm />
          </PrivateRoute>
        }
      />

      {/* Otras rutas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<PrivateRoute role="STUDENT"><StudentPage /></PrivateRoute>} />
      <Route path="/teacher-dashboard" element={<PrivateRoute role="TEACHER"><TeacherDashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
