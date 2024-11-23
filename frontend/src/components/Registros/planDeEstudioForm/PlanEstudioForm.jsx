// Continuación del PlanEstudioForm
const PlanEstudioForm = () => {
    const addPlanEstudio = useStore((state) => state.addPlanEstudio)
    const [formData, setFormData] = React.useState({
      carrera_id: '',
      nombre: '',
      año: '',
      descripcion: '',
      estado: ''
    })
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addPlanEstudio(formData)
      setFormData({
        carrera_id: '',
        nombre: '',
        año: '',
        descripcion: '',
        estado: ''
      })
    }
  
    return (
      <div>
        <h2>Registrar Plan de Estudio</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID Carrera:</label>
            <input
              type="text"
              value={formData.carrera_id}
              onChange={(e) => setFormData({...formData, carrera_id: e.target.value})}
            />
          </div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div>
            <label>Año:</label>
            <input
              type="number"
              value={formData.año}
              onChange={(e) => setFormData({...formData, año: e.target.value})}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            />
          </div>
          <div>
            <label>Estado:</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
            >
              <option value="">Seleccione...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="En Revisión">En Revisión</option>
            </select>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    )
  }

  export default PlanEstudioForm;