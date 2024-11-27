import { useState, useEffect } from 'react';
import useCursoStore from '../../../store/CursoStore';
import usePlanStore from '../../../store/PlanEstudioStore';
import useTeacherStore from '../../../store/TeacherStore';
import useHorarioStore from '../../../store/HorarioStore';
import useCicloStore from '../../../store/CicloStore';

const CursoForm = () => {
  const [formData, setFormData] = useState({
    plan_id: '',
    profesor_id: '',
    horario_id: '',
    ciclo_id: '',
    nombre: '',
    codigo: '',
    periodo_academico: '',
    paralelo: '',
    cupo_maximo: '',
    aula: '',
    estado: 'ACTIVO'
  });

  const { addCurso } = useCursoStore();
  const { planes, fetchPlanes } = usePlanStore();
  const { teachers, fetchTeachers } = useTeacherStore();
  const { horarios, fetchHorarios } = useHorarioStore();
  const { ciclos, fetchCiclos } = useCicloStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch related data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting to fetch related data...');
        
        // Fetch and log each data set separately
        const fetchedPlanes = await fetchPlanes();
        console.log('Fetched Planes:', fetchedPlanes);
        
        const fetchedTeachers = await fetchTeachers();
        console.log('Fetched Teachers:', fetchedTeachers);
        console.log('Teachers state:', teachers);
        
        const fetchedHorarios = await fetchHorarios();
        console.log('Fetched Horarios:', fetchedHorarios);
        
        const fetchedCiclos = await fetchCiclos();
        console.log('Fetched Ciclos:', fetchedCiclos);
        console.log('Ciclos state:', ciclos);
        
      } catch (err) {
        console.error('Error fetching related data:', err);
        setError('No se pudieron cargar los datos relacionados');
      }
    };
    
    fetchData();
  }, [fetchPlanes, fetchTeachers, fetchHorarios, fetchCiclos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert numeric fields to integers
      const cursoData = {
        ...formData,
        plan_id: parseInt(formData.plan_id),
        profesor_id: parseInt(formData.profesor_id),
        horario_id: parseInt(formData.horario_id),
        ciclo_id: parseInt(formData.ciclo_id),
        cupo_maximo: parseInt(formData.cupo_maximo)
      };

      await addCurso(cursoData);

      // Reset form after successful submission
      setFormData({
        plan_id: '',
        profesor_id: '',
        horario_id: '',
        ciclo_id: '',
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Curso</h2>

      <div className="mb-4">
        <label className="block mb-2">Plan de Estudios:</label>
        <select
          name="plan_id"
          value={formData.plan_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione un Plan</option>
          {planes.map((plan) => (
            <option key={plan.plan_id} value={plan.plan_id}>
              {plan.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Profesor:</label>
        <select
          name="profesor_id"
          value={formData.profesor_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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

      <div className="mb-4">
        <label className="block mb-2">Ciclo:</label>
        <select
          name="ciclo_id"
          value={formData.ciclo_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione un Ciclo</option>
          {ciclos.map((ciclo) => (
            <option key={ciclo.ciclo_id} value={ciclo.ciclo_id}>
              {ciclo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Horario:</label>
        <select
          name="horario_id"
          value={formData.horario_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione un Horario</option>
          {horarios.map((horario) => (
            <option key={horario.horario_id} value={horario.horario_id}>
              {horario.dia} {horario.horaInicio} - {horario.horaFin}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Código:</label>
        <input
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          maxLength={20}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Periodo Académico:</label>
        <input
          type="text"
          name="periodo_academico"
          value={formData.periodo_academico}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          maxLength={20}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Paralelo:</label>
        <input
          type="text"
          name="paralelo"
          value={formData.paralelo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          maxLength={10}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Cupo Máximo:</label>
        <input
          type="number"
          name="cupo_maximo"
          value={formData.cupo_maximo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Aula (Opcional):</label>
        <input
          type="text"
          name="aula"
          value={formData.aula}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          maxLength={50}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
          <option value="FINALIZADO">Finalizado</option>
        </select>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Guardando...' : 'Registrar Curso'}
      </button>
    </form>
  );
};

export default CursoForm;