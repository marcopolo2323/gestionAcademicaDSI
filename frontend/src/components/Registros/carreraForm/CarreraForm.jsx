// Formulario de Carrera
const CarreraForm = () => {
    const addCarrera = useStore((state) => state.addCarrera)
    const [formData, setFormData] = React.useState({
      nombre: '',
      codigo: '',
      duracion: '',
      descripcion: ''
    })
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addCarrera(formData)
      setFormData({
        nombre: '',
        codigo: '',
        duracion: '',
        descripcion: ''
      })
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
            />
          </div>
          <div>
            <label>Código:</label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) => setFormData({...formData, codigo: e.target.value})}
            />
          </div>
          <div>
            <label>Duración (semestres):</label>
            <input
              type="number"
              value={formData.duracion}
              onChange={(e) => setFormData({...formData, duracion: e.target.value})}
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