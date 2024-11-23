const { useRolesStore } = require("../../../store/rolesStore");

// components/RolesForm.jsx
const RolesForm = () => {
    const { formData, updateField, resetForm } = useRolesStore();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      resetForm();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Registro de Rol</h2>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => updateField('nombre', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => updateField('descripcion', e.target.value)}
          />
        </div>
        <button type="submit">Guardar Rol</button>
      </form>
    );
  };

  export default RolesForm