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
  const { Ciclos, fetchCiclos } = useCicloStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCiclos();
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
    
    // Existing validations...
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

    const requiredFields = ['nombres', 'apellidos', 'ciclo_id'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'Este campo es requerido';
      }
    });

    if (formData.userType === 'student') {
      if (!formData.fechaNacimiento) {
        errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
      }
    }

    if (formData.userType === 'teacher' && !formData.especialidad.trim()) {
      errors.especialidad = 'La especialidad es requerida para profesores';
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
  
      const commonData = {
        usuario_id: usuarioResponse.usuario_id,
        dni: formData.dni.trim(),
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim().toLowerCase(),
        estado: 'ACTIVO',
        ciclo_id: parseInt(formData.ciclo_id)
      };
  
      let finalData;
      if (formData.userType === 'student') {
        finalData = {
          ...commonData,
          fecha_nacimiento: new Date(formData.fechaNacimiento).toISOString(),
          direccion: formData.direccion.trim()
        };
        console.log('Datos estudiante a enviar:', finalData);
        await addStudent(finalData);
      } else {
        finalData = {
          ...commonData,
          especialidad: formData.especialidad.trim()
        };
        console.log('Datos profesor a enviar:', finalData);
        await addTeacher(finalData);
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
      {/* Username and Password fields */}
      {/* Ciclo Selection - Added console.log */}
      <div>
        <select
          name="ciclo_id"
          value={formData.ciclo_id}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded ${formErrors.ciclo_id ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Seleccionar Ciclo</option>
          {Array.isArray(Ciclos) && Ciclos.map((ciclo) => (
            <option key={ciclo.ciclo_id} value={ciclo.ciclo_id}>
              Ciclo {ciclo.numero_ciclo}
            </option>
          ))}
        </select>
        {formErrors.ciclo_id && (
          <p className="text-red-500 text-sm mt-1">{formErrors.ciclo_id}</p>
        )}
        {/* Debug info
        <p className="text-xs text-gray-500 mt-1">
          Ciclos disponibles: {Ciclos?.length || 0}
        </p> */}
      </div>

      <div className="space-y-2">
        <div>
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
        </div>

        <div>
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
        </div>
      </div>

      {/* User Type Selection */}
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="userType"
            checked={formData.userType === 'student'}
            onChange={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
            className="mr-2"
          />
          Estudiante
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="userType"
            checked={formData.userType === 'teacher'}
            onChange={() => setFormData(prev => ({ ...prev, userType: 'teacher' }))}
            className="mr-2"
          />
          Profesor
        </label>
      </div>

      {/* Campos comunes */}
      {['dni', 'nombres', 'apellidos', 'email'].map((field) => (
        <div key={field}>
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={`w-full p-2 border rounded ${formErrors[field] ? 'border-red-500' : ''}`}
            required
          />
          {formErrors[field] && (
            <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
          )}
        </div>
      ))}

      {/* Campos específicos de estudiante */}
      {formData.userType === 'student' && (
        <>
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

      {/* Campos específicos de profesor */}
      {formData.userType === 'teacher' && (
        <div>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            placeholder="Especialidad"
            className={`w-full p-2 border rounded ${formErrors.especialidad ? 'border-red-500' : ''}`}
            required
          />
          {formErrors.especialidad && (
            <p className="text-red-500 text-sm mt-1">{formErrors.especialidad}</p>
          )}
        </div>
      )}

      <input
        type="text"
        name="telefono"
        value={formData.telefono}
        onChange={handleInputChange}
        placeholder="Teléfono"
        className="w-full p-2 border rounded"
      />

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