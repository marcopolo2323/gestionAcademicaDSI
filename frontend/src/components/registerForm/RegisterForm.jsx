import { useState } from 'react';
import useStudentStore from './../../store/StudentStore';
import useTeacherStore from './../../store/TeacherStore';

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
  
    // Validar DNI (asegurarse de que no sea vacío)
    if (!dni.trim()) {
      setError('El campo DNI es obligatorio.');
      setIsLoading(false);
      return; // Detiene el envío del formulario si el DNI es vacío
    }
  
    try {
      // Validar usuario_id
      if (!usuarioId) {
        throw new Error('El campo usuario_id es obligatorio.');
      }
  
      let userData;
  
      if (userType === 'student') {
        userData = {
          username,
          email,
          password,
          dni,
          nombres,
          apellidos,
          fecha_nacimiento: new Date(fechaNacimiento).toISOString().split('T')[0],
          direccion,
          telefono,
          usuario_id: usuarioId,
        };
        await addStudent(userData);
      } else {
        userData = {
          username,
          email,
          password,
          dni,
          nombres,
          apellidos,
          especialidad,
          telefono,
          usuario_id: usuarioId,
        };
        await addTeacher(userData);
      }
  
      setSuccess('Registro exitoso! Redirigiendo a la página de inicio de sesión...');
    } catch (error) {
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
          /> Estudiante
        </label>
        <label>
          <input 
            type="radio" 
            checked={userType === 'teacher'} 
            onChange={() => setUserType('teacher')} 
          /> Profesor
        </label>
      </div>

      {/* Campos específicos para Estudiante */}
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
          {/* Campo para usuario_id */}
          <input
            type="text"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            placeholder="Usuario ID"
            required
          />
        </>
      )}

      {/* Campos específicos para Profesor */}
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
          />
          {/* Campo para usuario_id */}
          <input
            type="text"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            placeholder="Usuario ID"
            required
          />
        </>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default RegisterForm;

