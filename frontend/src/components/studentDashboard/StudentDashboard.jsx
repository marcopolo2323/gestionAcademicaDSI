import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../utils/api';

const StudentDashboard = () => {
  const user = useStore((state) => state.user);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulamos la carga de un horario desde un API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get(`/student/${user?.id}/schedule`); // Suponiendo que hay un endpoint
        setSchedule(response.data);
      } catch (error) {
        console.error('Error al obtener el horario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchSchedule();
  }, [user]);

  if (!user) {
    return <p>Por favor, inicia sesión para acceder a tu dashboard.</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.username}</h1>
      <h2>Tu horario:</h2>
      {isLoading ? (
        <p>Cargando horario...</p>
      ) : schedule.length === 0 ? (
        <p>No tienes clases programadas.</p>
      ) : (
        <ul>
          {schedule.map((classItem) => (
            <li key={classItem.id}>
              {classItem.courseName} - {classItem.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
