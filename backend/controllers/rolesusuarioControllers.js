const RolesUsuarios = require('../models/RolesUsuarios'); // Asegúrate de que el modelo de RolesUsuarios esté definido correctamente

// Crear una nueva relación de rol-usuario
const createRolUsuarioController = async ({ usuario_id, rol_id }) => {
    try {
        const newRolUsuario = await RolesUsuarios.create({ usuario_id, rol_id });
        return newRolUsuario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todas las relaciones de rol-usuario
const getAllRolUsuarioController = async () => {
    try {
        const rolesUsuarios = await RolesUsuarios.findAll();
        return rolesUsuarios;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar una relación de rol-usuario por ID
const updatedRolUsuarioByIdController = async (usuario_id, rol_id, rolData) => {
    try {
        const rolUsuario = await RolesUsuarios.findOne({ where: { usuario_id, rol_id } });
        if (!rolUsuario) {
            return null; // Retorna null si no se encuentra la relación
        }
        await rolUsuario.update(rolData);
        return rolUsuario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una relación de rol-usuario por ID
const deleteRolUsuarioByIdController = async (usuario_id, rol_id) => {
    try {
        const deletedRolUsuario = await RolesUsuarios.destroy({
            where: { usuario_id, rol_id }
        });

        if (deletedRolUsuario === 0) {
            throw new Error('Relación de rol-usuario no encontrada');
        }

        return { message: 'Relación de rol-usuario eliminada exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar la relación de rol-usuario: ${error.message}`);
    }
};

module.exports = {
    createRolUsuarioController,
    getAllRolUsuarioController,
    updatedRolUsuarioByIdController,
    deleteRolUsuarioByIdController
};