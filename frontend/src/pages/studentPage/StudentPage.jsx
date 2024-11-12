import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';

const StudentPage = () => {
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);

  // Simulamos la carga de datos del usuario
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>; // Mostrar un indicador de carga mientras se obtienen los datos
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Nombre de usuario: {user?.username}</p>
      <p>Email: {user?.email}</p>
      {/* Mostrar más detalles del estudiante, por ejemplo: */}
      <p>Nombre completo: {user?.fullName}</p>
      <p>Fecha de inscripción: {user?.enrollmentDate}</p>

      {/* Aquí podrías agregar un enlace o botón para editar la información del perfil */}
    </div>
  );
};

export default StudentPage;
