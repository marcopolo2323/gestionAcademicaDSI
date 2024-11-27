import { useState, useEffect } from 'react';
import useUsuarioStore from '../../../store/UsuarioStore';
import useStudentStore from '../../../store/StudentStore';
import useTeacherStore from '../../../store/TeacherStore';
import useCicloStore from '../../../store/CicloStore';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    dni: '',
    nombres: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
    especialidad: '',
    ciclo_id: '',
    userType: 'student'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { addUsuario, fetchRoles, roles } = useUsuarioStore();
  const { addStudent } = useStudentStore();
  const { addTeacher } = useTeacherStore();
  const { ciclos, fetchCiclos } = useCicloStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCiclos();
        console.log('Ciclos fetched:', ciclos); // Add this line
      console.log('Number of ciclos:', ciclos?.length || 0); // And this line
        await fetchRoles();
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos');
      }
    };
    loadData();
  }, [fetchCiclos, fetchRoles]);

  const validateForm = () => {
    const errors = {};
    
    if (formData.username.length < 4 || formData.username.length > 20) {
      errors.username = 'El username debe tener entre 4 y 20 caracteres';
    }
    
    if (formData.password.length < 4) {
      errors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    if (!/^\d{8}$/.test(formData.dni)) {
      errors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    const requiredFields = ['nombres', 'apellidos', 'dni', 'email'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'Este campo es requerido';
      }
    });

    if (formData.userType === 'student') {
      if (!formData.fechaNacimiento) {
        errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
      }
      
      if (!formData.ciclo_id) {
        errors.ciclo_id = 'El ciclo es requerido';
      }
    }

    if (formData.userType === 'teacher') {
      if (formData.especialidad && formData.especialidad.trim().length < 2) {
        errors.especialidad = 'La especialidad debe tener al menos 2 caracteres si se proporciona';
      }
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    setIsLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const rolId = roles.find(rol => 
        rol.nombre === (formData.userType === 'student' ? 'ROLE_STUDENT' : 'ROLE_TEACHER')
      )?.rol_id;
  
      if (!rolId) {
        throw new Error('Rol no encontrado');
      }
  
      const usuarioData = {
        username: formData.username.trim(),
        password_hash: formData.password,
        rol_id: rolId
      };
  
      console.log('Usuario data:', usuarioData);
      const usuarioResponse = await addUsuario(usuarioData);
  
      if (!usuarioResponse || !usuarioResponse.usuario_id) {
        throw new Error('No se pudo crear el usuario correctamente');
      }
  
      if (formData.userType === 'student') {
        const studentData = {
          usuario_id: usuarioResponse.usuario_id,
          dni: formData.dni.trim(),
          nombres: formData.nombres.trim(),
          apellidos: formData.apellidos.trim(),
          telefono: formData.telefono.trim() || null,
          email: formData.email.trim().toLowerCase(),
          estado: 'ACTIVO',
          ciclo_id: parseInt(formData.ciclo_id),
          fecha_nacimiento: new Date(formData.fechaNacimiento).toISOString(),
          direccion: formData.direccion.trim() || null
        };
        
        console.log('Datos estudiante a enviar:', studentData);
        await addStudent(studentData);
      } else {
        const teacherData = { 
          usuario_id: usuarioResponse.usuario_id,
          dni: formData.dni.trim(),
          nombres: formData.nombres.trim(),
          apellidos: formData.apellidos.trim(),
          especialidad: formData.especialidad.trim() || null,
          telefono: formData.telefono.trim() || null,
          email: formData.email.trim().toLowerCase(),
          estado: 'ACTIVO'
        };
        
        console.log('Datos profesor a enviar:', teacherData);
        await addTeacher(teacherData);
      }
  
      setSuccess('¡Registro exitoso!');
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Response data:', error.response?.data);
      setError(error.response?.data?.message || error.message || 'Error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto p-4">
      {/* User Type Selection */}
      <div className="flex gap-4 justify-center mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="userType"
            checked={formData.userType === 'student'}
            onChange={() => setFormData(prev => ({ 
              ...prev, 
              userType: 'student',
              especialidad: '' 
            }))}
            className="mr-2"
          />
          Estudiante
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="userType"
            checked={formData.userType === 'teacher'}
            onChange={() => setFormData(prev => ({ 
              ...prev, 
              userType: 'teacher',
              ciclo_id: '',
              fechaNacimiento: '',
              direccion: ''
            }))}
            className="mr-2"
          />
          Profesor
        </label>
      </div>

      {/* Common Input Fields */}
      <div className="space-y-2">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className={`w-full p-2 border rounded ${formErrors.username ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.username && (
          <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
        )}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className={`w-full p-2 border rounded ${formErrors.password ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
        )}

        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleInputChange}
          placeholder="DNI"
          className={`w-full p-2 border rounded ${formErrors.dni ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.dni && (
          <p className="text-red-500 text-sm mt-1">{formErrors.dni}</p>
        )}

        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleInputChange}
          placeholder="Nombres"
          className={`w-full p-2 border rounded ${formErrors.nombres ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.nombres && (
          <p className="text-red-500 text-sm mt-1">{formErrors.nombres}</p>
        )}

        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleInputChange}
          placeholder="Apellidos"
          className={`w-full p-2 border rounded ${formErrors.apellidos ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.apellidos && (
          <p className="text-red-500 text-sm mt-1">{formErrors.apellidos}</p>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : ''}`}
          required
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}

        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono (opcional)"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Student-specific Fields */}
      {formData.userType === 'student' && (
        <>
          <div>
            <select
              name="ciclo_id"
              value={formData.ciclo_id}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${formErrors.ciclo_id ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Seleccionar Ciclo</option>
              {Array.isArray(ciclos) && ciclos.map((ciclo) => (
                <option key={ciclo.ciclo_id} value={ciclo.ciclo_id}>
                  Ciclo {ciclo.nombre}
                </option>
              ))}
            </select>
            {formErrors.ciclo_id && (
              <p className="text-red-500 text-sm mt-1">{formErrors.ciclo_id}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${formErrors.fechaNacimiento ? 'border-red-500' : ''}`}
              required
            />
            {formErrors.fechaNacimiento && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fechaNacimiento}</p>
            )}
          </div>

          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Dirección"
            className="w-full p-2 border rounded"
          />
        </>
      )}

      {/* Teacher-specific Fields */}
      {formData.userType === 'teacher' && (
        <div>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            placeholder="Especialidad (opcional)"
            className={`w-full p-2 border rounded ${formErrors.especialidad ? 'border-red-500' : ''}`}
          />
          {formErrors.especialidad && (
            <p className="text-red-500 text-sm mt-1">{formErrors.especialidad}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
    </form>
  );
};

export default RegisterForm;