// Formulario de Carrera
import React from 'react';
import useStore from '../../../store/carreraStore';

const CarreraForm = () => {
  const addCarrera = useStore((state) => state.addCarrera)
  const [formData, setFormData] = React.useState({
    nombre: '',
    descripcion: '',
    duracion_semestres: '', // Cambiado de 'duracion' a 'duracion_semestres'
    estado: 'ACTIVO' // Añadido campo estado
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addCarrera(formData)
      setFormData({
        nombre: '',
        descripcion: '',
        duracion_semestres: '',
        estado: 'ACTIVO'
      })
    } catch (error) {
      console.error('Error al guardar:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }
  
  return (
    <div>
      <h2>Registrar Carrera</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Duración (semestres):</label>
          <input
            type="number"
            value={formData.duracion_semestres}
            onChange={(e) => setFormData({...formData, duracion_semestres: parseInt(e.target.value)})}
            required
            min="1"
            max="12"
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

  export default CarreraForm;