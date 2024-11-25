import React, { useState, useEffect } from 'react';
import useAsistenciaStore from '../../../store/AsistenciaStore';
import useCursoStore from '../../../store/CursoStore';

const AsistenciaForm = () => {
  const { registrarAsistencia, loading } = useAsistenciaStore();
  const { cursos, fetchCursos } = useCursoStore();
  
  const [formData, setFormData] = useState({
    cursoId: '',
    fecha: new Date().toISOString().split('T')[0],
    asistencias: [] // Array para guardar las asistencias
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  // Obtener estudiantes cuando se selecciona un curso
  const handleCursoChange = async (cursoId) => {
    try {
      // Aquí deberías hacer la llamada a tu API para obtener los estudiantes del curso
      // const response = await fetch(`/api/cursos/${cursoId}/estudiantes`);
      // const data = await response.json();
      // setEstudiantes(data);
      
      // Por ahora usaré datos de ejemplo
      const estudiantesEjemplo = [
        { id: 1, nombre: 'Juan Pérez', matricula: '2024001' },
        { id: 2, nombre: 'María García', matricula: '2024002' },
        { id: 3, nombre: 'Pedro López', matricula: '2024003' },
      ];
      setEstudiantes(estudiantesEjemplo);
      
      setFormData(prev => ({
        ...prev,
        cursoId,
        asistencias: estudiantesEjemplo.map(est => ({
          matricula_id: est.id,
          estado: 'AUSENTE',
          minutos_atraso: 0,
        }))
      }));
    } catch (err) {
      setError('Error al cargar los estudiantes');
    }
  };

  const handleAsistenciaChange = (matriculaId, estado) => {
    setFormData(prev => ({
      ...prev,
      asistencias: prev.asistencias.map(asistencia => 
        asistencia.matricula_id === matriculaId 
          ? { 
              ...asistencia, 
              estado,
              hora_registro: estado === 'PRESENTE' ? new Date().toTimeString().split(' ')[0] : null 
            }
          : asistencia
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.cursoId) {
      setError('Por favor seleccione un curso');
      return;
    }

    try {
      await registrarAsistencia({
        fecha: formData.fecha,
        curso_id: formData.cursoId,
        asistencias: formData.asistencias
      });
    } catch (err) {
      setError('Error al registrar la asistencia');
    }
  };

  return (
    <div>
      <h2>Registro de Asistencia</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Curso:</label>
          <select
            value={formData.cursoId}
            onChange={(e) => handleCursoChange(e.target.value)}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>
                {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({...formData, fecha: e.target.value})}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {estudiantes.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Minutos Atraso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map(estudiante => {
                const asistencia = formData.asistencias.find(
                  a => a.matricula_id === estudiante.id
                );
                return (
                  <tr key={estudiante.id}>
                    <td>{estudiante.matricula}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{asistencia?.estado}</td>
                    <td>
                      {asistencia?.estado === 'ATRASO' && (
                        <input
                          type="number"
                          min="0"
                          max="120"
                          value={asistencia.minutos_atraso || 0}
                          onChange={(e) => {
                            const minutos = parseInt(e.target.value);
                            setFormData(prev => ({
                              ...prev,
                              asistencias: prev.asistencias.map(a =>
                                a.matricula_id === estudiante.id
                                  ? { ...a, minutos_atraso: minutos }
                                  : a
                              )
                            }));
                          }}
                        />
                      )}
                    </td>
                    <td>
                      <select
                        value={asistencia?.estado}
                        onChange={(e) => handleAsistenciaChange(estudiante.id, e.target.value)}
                      >
                        <option value="AUSENTE">Ausente</option>
                        <option value="PRESENTE">Presente</option>
                        <option value="JUSTIFICADO">Justificado</option>
                        <option value="ATRASO">Atraso</option>
                        <option value="PERMISO">Permiso</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {error && <div>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Asistencia'}
        </button>
      </form>
    </div>
  );
};

export default AsistenciaForm;