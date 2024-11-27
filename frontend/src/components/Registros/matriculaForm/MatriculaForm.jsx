import { useState, useEffect } from 'react';
import useMatriculaStore from '../../../store/MatriculaStore';
import useStudentStore from '../../../store/StudentStore';
import useCursoStore from '../../../store/CursoStore';
import useCicloStore from '../../../store/CicloStore';



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
  
  const { students, fetchStudents, fetchStudentsByCiclo } = useStudentStore();
  const { cursos, fetchCursos, fetchCursosByCiclo, cursosEnCiclo } = useCursoStore();
  const { ciclos, fetchCiclos } = useCicloStore();

  // Local state
  const [formData, setFormData] = useState({
    estudiante_id: '',
    curso_id: '',
    ciclo_id: '',
    estado: 'MATRICULADO'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedCiclo, setSelectedCiclo] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchMatriculas(),
          fetchCiclos(),
          fetchCursos(),
          fetchStudents()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [fetchMatriculas, fetchCiclos, fetchCursos, fetchStudents]);

  // Filtrar estudiantes cuando cambia el ciclo
  useEffect(() => {
    const loadStudentsByCiclo = async () => { 
      if (selectedCiclo) {
        try {
          const studentsData = await fetchStudentsByCiclo(selectedCiclo);
          
          console.log('Received students data:', studentsData);
          
          if (!studentsData || studentsData.length === 0) {
            console.warn('No students found for this ciclo');
            setFilteredStudents([]);
            return;
          }
  
          const filteredStudentsData = studentsData.map(student => {
            console.log('Processing student:', student);
            return {
              id: student.estudiante_id || student.id,
              nombre: student.nombres || student.nombre || 'Sin nombre'
            };
          });
          
          setFilteredStudents(filteredStudentsData);
        } catch (error) {
          console.error('Comprehensive error fetching students:', error);
          setFilteredStudents([]);
        }
      } else {
        setFilteredStudents([]);
      }
    };
    
    loadStudentsByCiclo();
  }, [selectedCiclo, fetchStudentsByCiclo]);

  useEffect(() => {
    const loadCursosByCiclo = async () => { 
      if (selectedCiclo) {
        try {
          await fetchCursosByCiclo(selectedCiclo);
        } catch (error) {
          console.error('Detailed error loading cursos by ciclo:', error);
        }
      }
    };
    
    loadCursosByCiclo();
  }, [selectedCiclo, fetchCursosByCiclo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const matriculaData = {
        ...formData,
        ciclo_id: selectedCiclo
      };

      if (isEditing && editId) {
        await updateMatricula(editId, matriculaData);
      } else {
        await createMatricula(matriculaData);
      }
      
      // Limpiar formulario
      setFormData({
        estudiante_id: '',
        curso_id: '',
        estado: 'MATRICULADO'
      });
      setIsEditing(false);
      setEditId(null);
      setSelectedCiclo('');
      
      // Recargar datos
      await fetchMatriculas();
    } catch (error) {
      console.error('Error saving matricula:', error);
    }
  };

  // Función para manejar edición de matrícula
  const handleEdit = (matricula) => {
    setIsEditing(true);
    setEditId(matricula.matricula_id);
    setSelectedCiclo(matricula.ciclo_id);
    setFormData({
      estudiante_id: matricula.estudiante_id,
      curso_id: matricula.curso_id,
      estado: matricula.estado
    });
  };

  // Función para manejar eliminación de matrícula
  const handleDelete = async (matriculaId) => {
    try {
      await deleteMatricula(matriculaId);
      await fetchMatriculas();
    } catch (error) {
      console.error('Error deleting matricula:', error);
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
              Ciclo:
              <select
                value={selectedCiclo}
                onChange={(e) => {
                  const cicloId = e.target.value;
                  setSelectedCiclo(cicloId);
                  setFormData({
                    ...formData,
                    estudiante_id: '', 
                    curso_id: ''
                  });
                }}
                required
              >
                <option value="">Seleccionar Ciclo</option>
                {ciclos.map(ciclo => (
                  <option 
                    key={ciclo.ciclo_id} 
                    value={ciclo.ciclo_id}
                  >
                    {ciclo.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Estudiante:
              <select
                value={formData.estudiante_id}
                onChange={(e) => {
                  const estudianteId = e.target.value;
                  setFormData({
                    ...formData, 
                    estudiante_id: estudianteId,
                    curso_id: '' // Reset curso when student changes
                  });
                }}
                required
                disabled={!selectedCiclo}
              >
                <option value="">Seleccionar Estudiante</option>
                {filteredStudents.map(student => (
                  <option 
                    key={student.id} 
                    value={student.id}
                  >
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
                disabled={!selectedCiclo}
              >
                <option value="">Seleccionar Curso</option>
                {cursosEnCiclo.map(curso => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Estado:
              <select
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
              >
                <option value="MATRICULADO">Matriculado</option>
                <option value="APROBADO">Aprobado</option>
                <option value="DESAPROBADO">Desaprobado</option>
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
              <th>Ciclo</th>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((matricula) => (
              <tr key={matricula.matricula_id}>
                <td>{matricula.matricula_id}</td>
                <td>
                  {ciclos.find(c => c.ciclo_id === matricula.ciclo_id)?.numero_ciclo}
                </td>
                <td>
                  {students.find(s => s.id === matricula.estudiante_id)?.nombre}
                </td>
                <td>
                  {cursos.find(c => c.id === matricula.curso_id)?.nombre}
                </td>
                <td>{new Date(matricula.fecha_matricula).toLocaleDateString()}</td>
                <td>{matricula.estado}</td>
                <td>
                  <button onClick={() => handleEdit(matricula)}>Editar</button>
                  <button onClick={() => handleDelete(matricula.matricula_id)}>Eliminar</button>
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