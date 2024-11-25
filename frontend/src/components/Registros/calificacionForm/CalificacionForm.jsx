import { useState } from 'react'
import useCalificacionStore from '../../../store/CalificacionStore'
import useCursoStore from '../../../store/CursoStore'

const CalificacionForm = () => {
  const { registrarCalificacion } = useCalificacionStore()
  const { cursos } = useCursoStore()

  const [formData, setFormData] = useState({
    cursoId: '',
    estudianteId: '',
    nota: '',
    tipoEvaluacion: 'PARCIAL'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    registrarCalificacion(formData)
  }

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
        type="text" 
        placeholder="ID Estudiante"
        value={formData.estudianteId}
        onChange={(e) => setFormData({...formData, estudianteId: e.target.value})}
      />

      <input 
        type="number" 
        placeholder="Nota"
        value={formData.nota}
        onChange={(e) => setFormData({...formData, nota: e.target.value})}
      />

      <select 
        value={formData.tipoEvaluacion}
        onChange={(e) => setFormData({...formData, tipoEvaluacion: e.target.value})}
      >
        <option value="PARCIAL">Parcial</option>
        <option value="FINAL">Final</option>
      </select>

      <button type="submit">Registrar Calificación</button>
    </form>
  )
}

export default CalificacionForm