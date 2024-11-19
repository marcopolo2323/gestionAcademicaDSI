import { useState, useEffect } from 'react';
import {api} from '../../utils/api';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Este hook obtiene los cursos asociados al profesor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/teacher/courses'); // Endpoint para obtener los cursos
        setCourses(response.data);
      } catch (error) {
        setError('Error al obtener los cursos. Inténtalo de nuevo más tarde.');
        console.error('Error al obtener los cursos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>Your Courses</h2>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : courses.length === 0 ? (
        <p>You have no courses yet.</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.name} - {course.code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherDashboard;
