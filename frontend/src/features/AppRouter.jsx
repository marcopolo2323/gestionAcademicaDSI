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
import RolesForm from '../components/Registros/rolesForm/RolesForm';
import CarreraForm from '../components/Registros/carreraForm/CarreraForm';
import AsistenciaForm from '../components/Registros/asistenciaForm/AsistenciaForm';
import CalificacionForm from '../components/Registros/calificacionForm/CalificacionForm';
import CursoForm from '../components/Registros/cursosForm/CursosForm';
import RegistroHorario from '../components/Registros/horarioForm/Horario';
import PlanEstudioForm from '../components/Registros/planDeEstudioForm/PlanEstudioForm';
import MatriculaManagement from '../components/Registros/matriculaForm/MatriculaForm';
import CicloForm from '../components/Registros/cicloForm/cicloForm';

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
      <Route path='/rol' element={<RolesForm/>}/>
      <Route path='/carrera' element={<CarreraForm/>}/>
      <Route path='/asistencia' element={<AsistenciaForm/>}/>
      <Route path='/calificaciones' element={<CalificacionForm/>}/>
      <Route path='/cursos' element={<CursoForm/>}/>
      <Route path='/horario' element={<RegistroHorario/>}/>
      <Route path='/matricula' element={<MatriculaManagement/>}/>
      <Route path='/plan-estudios' element={<PlanEstudioForm/>}/>
      <Route path='/ciclo' element={<CicloForm/>}/>
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
      {/* Opcional: Ruta de página no encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;