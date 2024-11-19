import { useState } from 'react';
import useStudentStore from './../../store/StudentStore';
import useTeacherStore from './../../store/TeacherStore';
import useUsuarioStore from './../../store/UsuarioStore'; // Cambiado a tu store existente

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userType, setUserType] = useState('student');
  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const { addStudent } = useStudentStore();
  const { addTeacher } = useTeacherStore();
  const { agregarUsuario } = useUsuarioStore(); // Usando tu método existente

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const userData = {
        username,
        email,
        password,
        dni,
        nombres,
        apellidos,
        fechaNacimiento: new Date(fechaNacimiento),
        direccion,
        telefono,
        especialidad,
      };

      if (userType === 'student') {
        await addStudent(userData);
      } else {
        await addTeacher(userData);
      }
      setSuccess('Registro exitoso! Redirigiendo a la página de inicio de sesión...');
    } catch (error) {
      if (userType === 'student') {
        setError('Hubo un error al registrar el estudiante.');
      } else {
        setError('Hubo un error al registrar el profesor.');
      }
      console.error('Error al registrar usuario', error);
      setError(error.message || 'Hubo un error al registrar el usuario.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <div>
        <label>
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
      {userType === 'student' && (
        <>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="DNI"
            required
          />
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Nombres"
            required
          />
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Apellidos"
            required
          />
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            placeholder="Fecha de Nacimiento"
            required
          />
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
          />
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
          />
        </>
      )}
      {userType === 'teacher' && (
        <>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="DNI"
            required
          />
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Nombres"
            required
          />
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Apellidos"
            required
          />
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

