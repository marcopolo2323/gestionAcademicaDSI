import { useState } from 'react'
import useAsistenciaStore from '../stores/AsistenciaStore'
import useCursoStore from '../stores/CursoStore'

const AsistenciaForm = () => {
  const { registrarAsistencia } = useAsistenciaStore()
  const { cursos } = useCursoStore()

  const [formData, setFormData] = useState({
    cursoId: '',
    fecha: new Date().toISOString().split('T')[0],
    estudiantes: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    registrarAsistencia(formData)
  }

  const toggleAsistencia = (estudianteId) => {
    const existingIndex = formData.estudiantes.findIndex(
      est => est.estudianteId === estudianteId
    )

    if (existingIndex > -1) {
      setFormData(prev => ({
        ...prev,
        estudiantes: prev.estudiantes.filter(
          est => est.estudianteId !== estudianteId
        )
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        estudiantes: [...prev.estudiantes, { 
          estudianteId, 
          presente: true 
        }]
      }))
    }
  }
toggleAsistencia()
  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={formData.cursoId}
        onChange={(e) => setFormData({...formData, cursoId: e.target.value})}
      >
        {cursos.map(curso => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
      </select>

      <input 
        type="date"
        value={formData.fecha}
        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
      />

      {/* Lista de estudiantes por curso */}
      <div>
        {/* Esta parte requeriría lógica para obtener estudiantes del curso seleccionado */}
        <button type="submit">Registrar Asistencia</button>
      </div>
    </form>
  )
}

export default AsistenciaForm