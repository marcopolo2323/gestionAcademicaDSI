import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import StudentDashboard from '../../components/studentDashboard/StudentDashboard';
import TeacherDashboard from '../../components/teacherDashboard/TeacherDashboard';

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Redirigiendo al inicio de sesión...</p>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      default:
        return <p>Acceso denegado. Rol no reconocido.</p>;
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
