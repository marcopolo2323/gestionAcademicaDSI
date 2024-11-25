// components/RolesForm.jsx
import useRolStore from '../../../store/rolesStore';

const RolesForm = () => {
    const { formData, updateField, resetForm, addRole } = useRolStore();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addRole(formData);
            resetForm();
        } catch (error) {
            console.error('Error al guardar el rol:', error);
        }
    };
  
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">Registro de Rol</h2>
            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-medium">Nombre:</label>
                <input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => updateField('nombre', e.target.value)}
                    required
                    className="border rounded-md p-2"
                    minLength={2}
                    maxLength={50}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="descripcion" className="font-medium">Descripción:</label>
                <textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => updateField('descripcion', e.target.value)}
                    className="border rounded-md p-2"
                    maxLength={255}
                />
            </div>
            <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Guardar Rol
            </button>
        </form>
    );
};

export default RolesForm;