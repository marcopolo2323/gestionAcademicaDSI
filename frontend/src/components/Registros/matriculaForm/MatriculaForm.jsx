import { useState, useEffect } from 'react';
import useMatriculaStore from '../../../store/MatriculaStore';
import useStudentStore from '../../../store/StudentStore';
import useCursoStore from '../../../store/CursoStore';

const MatriculaManagement = () => {
  // Zustand stores
  const { 
    matriculas, 
    loading, 
    error, 
    fetchMatriculas, 
    createMatricula, 
    updateMatricula,
    deleteMatricula 
  } = useMatriculaStore();
  
  const { students, fetchStudents } = useStudentStore();
  const { cursos, fetchCursos } = useCursoStore();

  // Local state
  const [formData, setFormData] = useState({
    estudiante_id: '',
    curso_id: '',
    nota_final: '',
    estado: 'MATRICULADO'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchMatriculas(),
          fetchStudents(),
          fetchCursos()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing && editId) {
        await updateMatricula(editId, formData);
      } else {
        await createMatricula(formData);
      }
      
      // Limpiar formulario
      setFormData({
        estudiante_id: '',
        curso_id: '',
        nota_final: '',
        estado: 'MATRICULADO'
      });
      setIsEditing(false);
      setEditId(null);
      
      // Recargar datos
      await fetchMatriculas();
    } catch (error) {
      console.error('Error saving matricula:', error);
    }
  };

  const handleEdit = (matricula) => {
    setFormData({
      estudiante_id: matricula.estudiante_id,
      curso_id: matricula.curso_id,
      nota_final: matricula.nota_final,
      estado: matricula.estado
    });
    setIsEditing(true);
    setEditId(matricula.matricula_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta matrícula?')) {
      try {
        await deleteMatricula(id);
        await fetchMatriculas();
      } catch (error) {
        console.error('Error deleting matricula:', error);
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <h2>{isEditing ? 'Editar Matrícula' : 'Nueva Matrícula'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Estudiante:
              <select
                value={formData.estudiante_id}
                onChange={(e) => setFormData({...formData, estudiante_id: e.target.value})}
                required
              >
                <option value="">Seleccionar Estudiante</option>
                {Array.isArray(students) && students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Curso:
              <select
                value={formData.curso_id}
                onChange={(e) => setFormData({...formData, curso_id: e.target.value})}
                required
              >
                <option value="">Seleccionar Curso</option>
                {Array.isArray(cursos) && cursos.map(curso => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Nota Final:
              <input
                type="number"
                value={formData.nota_final}
                onChange={(e) => setFormData({...formData, nota_final: e.target.value})}
                min="0"
                max="100"
                step="0.01"
              />
            </label>
          </div>

          <div>
            <label>
              Estado:
              <select
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                required
              >
                {['MATRICULADO', 'APROBADO', 'REPROBADO', 'RETIRADO'].map(estado => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit">
            {isEditing ? 'Actualizar Matrícula' : 'Crear Matrícula'}
          </button>
        </form>
      </div>

      <div>
        <h2>Matrículas Registradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Nota Final</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(matriculas) && matriculas.map((matricula) => (
              <tr key={matricula.matricula_id}>
                <td>{matricula.matricula_id}</td>
                <td>
                  {Array.isArray(students) && 
                    students.find(s => s.id === matricula.estudiante_id)?.nombre}
                </td>
                <td>
                  {Array.isArray(cursos) && 
                    cursos.find(c => c.id === matricula.curso_id)?.nombre}
                </td>
                <td>{new Date(matricula.fecha_matricula).toLocaleDateString()}</td>
                <td>{matricula.nota_final}</td>
                <td>{matricula.estado}</td>
                <td>
                  <button onClick={() => handleEdit(matricula)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(matricula.matricula_id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatriculaManagement;