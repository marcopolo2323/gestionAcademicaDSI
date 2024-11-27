import { useState } from 'react';
import useHorarioStore from '../../../store/HorarioStore';

const HorarioForm = () => {
  // Eliminamos ciclo_id del estado inicial
  const [formData, setFormData] = useState({
    dia: '',
    horaInicio: '',
    horaFin: '',
    aula: ''
  });

  const { addHorario } = useHorarioStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enum de días que coincide con la definición del modelo
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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

    // Validación de día según el ENUM
    if (!DIAS.includes(formData.dia)) {
      setError('Día no válido');
      setLoading(false);
      return;
    }

    // Validación de hora de inicio anterior a hora de fin
    if (formData.horaInicio >= formData.horaFin) {
      setError('La hora de inicio debe ser anterior a la hora de fin');
      setLoading(false);
      return;
    }

    // Validación de campos requeridos
    if (!formData.dia || !formData.horaInicio || !formData.horaFin) {
      setError('Por favor complete los campos requeridos');
      setLoading(false);
      return;
    }

    try {
      // Cambia esto de un array a un objeto único
      const horarioData = {
        dia: formData.dia,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
        aula: formData.aula || null
      };
  
      await addHorario(horarioData);

      // Reiniciamos el formulario después de un registro exitoso
      setFormData({
        dia: '',
        horaInicio: '',
        horaFin: '',
        aula: ''
      });

      alert('Horario registrado exitosamente');
    } catch (err) {
      // Manejo de errores más específico
      setError(err.response?.data?.message || err.message || 'Error al registrar horario');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Horario</h2>

      <div className="mb-4">
        <label className="block mb-2">Día:</label>
        <select 
          name="dia" 
          value={formData.dia} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione un día</option>
          {DIAS.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Hora de Inicio:</label>
        <input
          type="time"
          name="horaInicio"
          value={formData.horaInicio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Hora de Fin:</label>
        <input
          type="time"
          name="horaFin"
          value={formData.horaFin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
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
          maxLength={255}
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Registrando...' : 'Registrar Horario'}
      </button>
    </form>
  );
};

export default HorarioForm;