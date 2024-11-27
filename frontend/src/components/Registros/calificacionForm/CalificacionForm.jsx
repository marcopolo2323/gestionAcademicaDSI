import { useState, useEffect } from 'react';
import useCalificacionStore from '../../../store/CalificacionesStore';
import useStudentStore from '../../../store/StudentStore';

const CalificacionForm = () => {
  const { addCalificaciones } = useCalificacionStore();
  const { students, fetchStudents } = useStudentStore();

  const [formData, setFormData] = useState({
    matriculaId: '',
    tipoEvaluacion: 'PARCIAL',
    nota: '',
    fecha: '',
    observacion: '',
    estado: 'REGISTRADO',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchStudents();
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    loadData();
  }, [fetchStudents]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.matriculaId) newErrors.matriculaId = 'Seleccione un estudiante';
    if (!formData.tipoEvaluacion) newErrors.tipoEvaluacion = 'Seleccione un tipo de evaluación';
    if (!formData.nota) newErrors.nota = 'Ingrese una nota';
    else if (formData.nota < 0 || formData.nota > 20) newErrors.nota = 'La nota debe estar entre 0 y 20';
    if (!formData.fecha) newErrors.fecha = 'Ingrese una fecha válida';
    if (formData.observacion && formData.observacion.length > 500)
      newErrors.observacion = 'La observación no puede exceder los 500 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = {
          matricula_id: parseInt(formData.matriculaId),
          tipoEvaluacion: formData.tipoEvaluacion,
          nota: parseFloat(formData.nota),
          fecha: formData.fecha,
          observacion: formData.observacion || '',  // Asegurarse de que 'observacion' sea una cadena vacía si no se ingresa nada
          estado: formData.estado,
        };

        console.log('Datos enviados:', data);

        await addCalificaciones(data);
        setSuccessMessage('Calificación registrada exitosamente');
        setFormData({
          matriculaId: '',
          tipoEvaluacion: 'PARCIAL',
          nota: '',
          fecha: '',
          observacion: '',
          estado: 'REGISTRADO',
        });
        setErrors({});
      } catch (error) {
        console.error('Error al registrar calificación:', error);
        setSuccessMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Calificación</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div>
        <label>Estudiante</label>
        <select
          value={formData.matriculaId}
          onChange={(e) => setFormData({ ...formData, matriculaId: e.target.value })}
        >
          <option value="">Seleccione un estudiante</option>
          {students.map((student) => (
            <option key={student.estudiante_id} value={student.estudiante_id}>
              {`${student.nombres} ${student.apellidos}`}
            </option>
          ))}
        </select>
        {errors.matriculaId && <span className="error">{errors.matriculaId}</span>}
      </div>

      <div>
        <label>Tipo de Evaluación</label>
        <select
          value={formData.tipoEvaluacion}
          onChange={(e) => setFormData({ ...formData, tipoEvaluacion: e.target.value })}
        >
          <option value="PARCIAL">Parcial</option>
          <option value="FINAL">Final</option>
          <option value="PRACTICA">Práctica</option>
          <option value="LABORATORIO">Laboratorio</option>
          <option value="PROYECTO">Proyecto</option>
          <option value="TAREA">Tarea</option>
        </select>
        {errors.tipoEvaluacion && <span className="error">{errors.tipoEvaluacion}</span>}
      </div>

      <div>
        <label>Nota</label>
        <input
          type="number"
          placeholder="Nota (0-20)"
          min="0"
          max="20"
          value={formData.nota}
          onChange={(e) => setFormData({ ...formData, nota: e.target.value ? parseFloat(e.target.value) : '' })}
        />
        {errors.nota && <span className="error">{errors.nota}</span>}
      </div>

      <div>
        <label>Fecha</label>
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
        />
        {errors.fecha && <span className="error">{errors.fecha}</span>}
      </div>

      <div>
        <label>Observación</label>
        <textarea
          placeholder="Observaciones (opcional, máximo 500 caracteres)"
          value={formData.observacion}
          onChange={(e) => setFormData({ ...formData, observacion: e.target.value })}
        />
        {errors.observacion && <span className="error">{errors.observacion}</span>}
      </div>

      <button type="submit">Registrar Calificación</button>
    </form>
  );
};

export default CalificacionForm;
