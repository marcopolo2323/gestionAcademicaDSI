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
 
  const { addUsuario } = useUsuarioStore();
  const { addStudent } = useStudentStore();
  const { addTeacher } = useTeacherStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validar campos requeridos
      if (!username || !password) {
        throw new Error('Username y contraseña son requeridos');
      }

      // Crear el objeto de usuario con los campos actualizados
      const usuarioData = {
        username: username.trim(),
        password_hash: password, // Nota: Idealmente el hash debería hacerse en el backend
        role: userType === 'student' ? 'ROLE_STUDENT' : 'ROLE_TEACHER'
      };

      console.log('Sending user data:', usuarioData);

      // Crear el usuario base
      const usuarioResponse = await addUsuario(usuarioData);

      console.log('Usuario response:', usuarioResponse);

      if (!usuarioResponse || !usuarioResponse.usuario_id) {
        throw new Error('No se pudo crear el usuario correctamente');
      }

      // Preparar los datos para estudiante/profesor
      const commonData = {
        usuario_id: usuarioResponse.usuario_id,
        dni: dni.trim(),
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        telefono: telefono.trim(),
        email: email.trim().toLowerCase(),
        estado: 'ACTIVO'
      };

      // Agregar campos específicos según el tipo de usuario
      if (userType === 'student') {
        const studentData = {
          ...commonData,
          fecha_nacimiento: new Date(fechaNacimiento).toISOString().split('T')[0],
          direccion: direccion.trim()
        };
        await addStudent(studentData);
      } else {
        const teacherData = {
          ...commonData,
          especialidad: especialidad.trim()
        };
        await addTeacher(teacherData);
      }

      setSuccess('¡Registro exitoso!');
    } catch (error) {
      console.error('Error detallado:', error);
      setError(error.message || 'Hubo un error al registrar el usuario');
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
            className="mr-2"
          />
          Estudiante
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={userType === 'teacher'}
            onChange={() => setUserType('teacher')}
            className="mr-2"
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        )}

        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? 'Registrando...' : 'Register'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default RegisterForm;