// MatriculaManagement.jsx
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
  
  const { students, fetchStudents } = useStudentStore();
  const { cursos, fetchCursos } = useCursoStore();
  const { ciclos, fetchCiclos } = useCicloStore();

  // Local state
  const [formData, setFormData] = useState({
    estudiante_id: '',
    curso_id: '',
    ciclo_id: '',
    nota_final: '',
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
          fetchCursos()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Filtrar estudiantes cuando cambia el ciclo
  useEffect(() => {
    const loadStudentsByCiclo = async () => {
      if (selectedCiclo) {
        try {
          const response = await axios.get(`/api/students/ciclo/${selectedCiclo}`);
          setFilteredStudents(response.data);
        } catch (error) {
          console.error('Error loading students by ciclo:', error);
        }
      } else {
        setFilteredStudents([]);
      }
    };

    loadStudentsByCiclo();
  }, [selectedCiclo]);

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

  // ... resto de funciones handleEdit y handleDelete permanecen igual ...

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
                  setSelectedCiclo(e.target.value);
                  setFormData({
                    ...formData,
                    estudiante_id: '', // Reset student selection when cycle changes
                  });
                }}
                required
              >
                <option value="">Seleccionar Ciclo</option>
                {Array.isArray(ciclos) && ciclos.map(ciclo => (
                  <option key={ciclo.ciclo_id} value={ciclo.ciclo_id}>
                    {ciclo.numero_ciclo}
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
                onChange={(e) => setFormData({...formData, estudiante_id: e.target.value})}
                required
                disabled={!selectedCiclo}
              >
                <option value="">Seleccionar Estudiante</option>
                {Array.isArray(filteredStudents) && filteredStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Rest of the form remains the same */}
          
          {/* ... existing curso, nota_final, and estado fields ... */}
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
                  {Array.isArray(ciclos) && 
                    ciclos.find(c => c.ciclo_id === matricula.ciclo_id)?.numero_ciclo}
                </td>
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