const Roles = require('../models/Roles'); // Asegúrate de que el modelo de Roles esté definido correctamente

// Crea un nuevo rol
const createRolController = async ({ nombre, descripcion }) => {
    try {
        const newRol = await Roles.create({ nombre, descripcion });
        return newRol;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los roles
const getAllRolesController = async () => {
    try {
        const roles = await Roles.findAll(); // Obtener todos los roles
        return roles;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un rol por ID
const updatedRolByIdController = async (rol_id, rolData) => {
    try {
        const updatedRol = await Roles.findByPk(rol_id);
        if (!updatedRol) {
            return null; // Retorna null si no se encuentra el rol
        }
        await updatedRol.update(rolData);
        return updatedRol;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un rol por ID
const deleteRolByIdController = async (rol_id) => {
    try {
        const deletedRol = await Roles.destroy({
            where: { rol_id: rol_id }
        });

        if (deletedRol === 0) {
            throw new Error('Rol no encontrado');
        }

        return { message: 'Rol eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el rol: ${error.message}`);
    }
};

module.exports = {
    createRolController,
    getAllRolesController,
    updatedRolByIdController,
    deleteRolByIdController
};