import { useState, useEffect } from 'react';
import useCursoStore from '../../store/CursoStore'; // Ajusta la ruta según tu estructura

const TeacherDashboard = () => {
  const { cursos, fetchCursos } = useCursoStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCursos = async () => {
      try {
        await fetchCursos();
        // Añade este console.log para ver la estructura de los datos
        console.log('Cursos recibidos:', cursos);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCursos();
  }, [fetchCursos]);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>Your Courses</h2>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : cursos.length === 0 ? (
        <p>You have no courses yet.</p>
      ) : (
        <ul>
          {cursos.map((curso, index) => (
            <li key={curso.id || index}>  {/* Usa index como fallback si no hay id */}
              {curso.nombre || curso.name} - {curso.codigo || curso.code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherDashboard;