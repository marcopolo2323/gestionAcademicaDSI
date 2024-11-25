import { useState } from 'react';
import useCursoStore from '../../../store/CursoStore';

const CursoForm = () => {
  const addCurso = useCursoStore((state) => state.addCurso);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Curso</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Plan de Estudios ID:</label>
          <input
            type="number"
            name="plan_id"
            value={formData.plan_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Profesor ID:</label>
          <input
            type="number"
            name="profesor_id"
            value={formData.profesor_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Horario ID:</label>
          <input
            type="number"
            name="horario_id"
            value={formData.horario_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Código:</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Periodo Académico:</label>
          <input
            type="text"
            name="periodo_academico"
            value={formData.periodo_academico}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Paralelo:</label>
          <input
            type="text"
            name="paralelo"
            value={formData.paralelo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Cupo Máximo:</label>
          <input
            type="number"
            name="cupo_maximo"
            value={formData.cupo_maximo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Aula:</label>
          <input
            type="text"
            name="aula"
            value={formData.aula}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Guardando...' : 'Registrar Curso'}
        </button>
      </form>
    </div>
  );
};

export default CursoForm;