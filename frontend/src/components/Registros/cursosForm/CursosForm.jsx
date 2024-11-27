import { useState, useEffect } from 'react';
import useCursoStore from '../../../store/CursoStore';
import usePlanStore from '../../../store/planEstudioStore';
import useTeacherStore from '../../../store/TeacherStore'; // Corrected import
import useHorarioStore from '../../../store/HorarioStore';

const CursoForm = () => {
  const addCurso = useCursoStore((state) => state.addCurso);
  const fetchPlanes = usePlanStore((state) => state.fetchPlanes);
  const planes = usePlanStore((state) => state.planes || []);
  
  // Changed from fetchProfesores to fetchTeachers
  const fetchTeachers = useTeacherStore((state) => state.fetchTeachers);
  
  // Changed from profesores to teachers
  const teachers = useTeacherStore((state) => state.teachers || []);
  
  const fetchHorarios = useHorarioStore((state) => state.fetchHorarios);
  const horarios = useHorarioStore((state) => state.horarios || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    plan_id: '',
    profesor_id: '', // Changed to match teacher store
    horario_id: '',
    nombre: '',
    codigo: '',
    periodo_academico: '',
    paralelo: '',
    cupo_maximo: '',
    aula: '',
    estado: 'ACTIVO'
  });

  // Fetch related data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPlanes();
        await fetchTeachers(); // Changed method name
        await fetchHorarios();
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('No se pudieron cargar los datos iniciales');
      }
    };

    loadData();
  }, [fetchPlanes, fetchTeachers, fetchHorarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convertir los IDs a números
      const cursoData = {
        ...formData,
        plan_id: parseInt(formData.plan_id),
        profesor_id: parseInt(formData.profesor_id),
        horario_id: parseInt(formData.horario_id),
        cupo_maximo: parseInt(formData.cupo_maximo)
      };

      await addCurso(cursoData);
      
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        plan_id: '',
        profesor_id: '',
        horario_id: '',
        nombre: '',
        codigo: '',
        periodo_academico: '',
        paralelo: '',
        cupo_maximo: '',
        aula: '',
        estado: 'ACTIVO'
      });

      alert('Curso creado exitosamente');
    } catch (err) {
      setError(err.message || 'Error al crear el curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Plan de Estudios:</label>
        <select
          name="plan_id"
          value={formData.plan_id}
          onChange={handleChange}
          required
        > 
          <option value="">Seleccione un Plan</option>
          {planes.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Profesor:</label>
        <select
          name="profesor_id"
          value={formData.profesor_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un Profesor</option>
          {teachers.map((teacher) => (
            <option key={teacher.profesor_id} value={teacher.profesor_id}>
              {teacher.nombre} {teacher.apellido}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Horario:</label>
        <select
          name="horario_id"
          value={formData.horario_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un Horario</option>
          {horarios.map((horario) => (
            <option key={horario.id} value={horario.id}>
              {horario.dia} {horario.hora_inicio} - {horario.hora_fin}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Código:</label>
        <input
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Periodo Académico:</label>
        <input
          type="text"
          name="periodo_academico"
          value={formData.periodo_academico}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Paralelo:</label>
        <input
          type="text"
          name="paralelo"
          value={formData.paralelo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Cupo Máximo:</label>
        <input
          type="number"
          name="cupo_maximo"
          value={formData.cupo_maximo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Aula:</label>
        <input
          type="text"
          name="aula"
          value={formData.aula}
          onChange={handleChange}
        />
      </div>

      {error && <div style={{color: 'red'}}>{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar Curso'}
      </button>
    </form>
  );
};

export default CursoForm;