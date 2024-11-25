const Admin = require('../models/Admin'); // Asegúrate de que el modelo de Admin esté definido correctamente

// Crea un nuevo Admin
const createAdminController = async ({ usuario_id, dni, nombres, apellidos, fecha_nacimiento, direccion, telefono, email }) => {
    try {
        const newAdmin = await Admin.create({ usuario_id, dni, nombres, apellidos, fecha_nacimiento, direccion, telefono, email });
        return newAdmin;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los Admins
const getAllAdminsController = async () => {
    try {
        const Admins = await Admin.findAll(); // Obtiene todos los Admins
        return Admins;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un Admin por ID
const updatedAdminByIdController = async (Admin_id, AdminData) => {
    try {
        const updatedAdmin = await Admin.findByPk(Admin_id);
        if (!updatedAdmin) {
            return null; // Retorna null si no se encuentra el Admin
        }
        await updatedAdmin.update(AdminData);
        return updatedAdmin;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un Admin por ID
const deleteAdminByIdController = async (Admin_id) => {
    try {
        const deletedAdmin = await Admin.destroy({
            where: { Admin_id: Admin_id }
        });

        if (deletedAdmin === 0) {
            throw new Error('Admin no encontrado');
        }

        return { message: 'Admin eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el Admin: ${error.message}`);
    }
};

module.exports = {
    createAdminController,
    getAllAdminsController,
    updatedAdminByIdController,
    deleteAdminByIdController
};