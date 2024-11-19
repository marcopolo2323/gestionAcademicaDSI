import { useState } from 'react';
import useUsuarioStore from './../../store/UsuarioStore';
import useStudentStore from './../../store/StudentStore';
import useTeacherStore from './../../store/TeacherStore';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userType, setUserType] = useState('student');
  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const { addStudent } = useStudentStore();
  const { addTeacher } = useTeacherStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Primero creamos el usuario base
      const usuarioResponse = await agregarUsuario({
        username,
        email,
        password,
        rol: userType === 'student' ? 'ESTUDIANTE' : 'PROFESOR'
      });

      // Verificamos que tengamos el usuario_id
      if (!usuarioResponse || !usuarioResponse.usuario_id) {
        throw new Error('No se pudo crear el usuario correctamente');
      }

      // Preparamos los datos según el tipo de usuario
      const userData = {
        usuario_id: usuarioResponse.usuario_id,
        dni,
        nombres,
        apellidos,
        telefono,
        email,
        estado: 'ACTIVO'
      };

      // Agregamos campos específicos según el tipo de usuario
      if (userType === 'student') {
        userData.fechaNacimiento = new Date(fechaNacimiento);
        userData.direccion = direccion;
        await addStudent(userData);
      } else {
        userData.especialidad = especialidad;
        await addTeacher(userData);
      }

      setSuccess('Registro exitoso! Redirigiendo a la página de inicio de sesión...');
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);
    } catch (error) {
      setError(
        error.message || 
        (userType === 'student' 
          ? 'Hubo un error al registrar el estudiante.' 
          : 'Hubo un error al registrar el profesor.')
      );
      console.error('Error al registrar usuario', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={userType === 'student'}
            onChange={() => setUserType('student')}
          />
          Estudiante
        </label>
        <label>
          <input
            type="radio"
            checked={userType === 'teacher'}
            onChange={() => setUserType('teacher')}
          />
          Profesor
        </label>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="DNI"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          placeholder="Nombres"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Apellidos"
          className="w-full p-2 border rounded"
          required
        />

        {userType === 'student' && (
          <>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              placeholder="Fecha de Nacimiento"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección"
              className="w-full p-2 border rounded"
            />
          </>
        )}

        {userType === 'teacher' && (
          <input
            type="text"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            placeholder="Especialidad"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
          />
        </>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default RegisterForm;

