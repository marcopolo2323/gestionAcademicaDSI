const Usuario = require('../models/Usuario'); // Asegúrate de que el modelo de Usuario esté definido correctamente

// Crea un nuevo usuario
const createUsuarioController = async ({ username, password_hash, email }) => {
    try {
        const newUsuario = await Usuario.create({ username, password_hash, email });
        return newUsuario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los usuarios
const getAllUsuariosController = async () => {
    try {
        const usuarios = await Usuario.findAll(); // Cambiado de findAll a find para Mongoose
        return usuarios;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un usuario por ID
const updatedUsuarioByIdController = async (usuario_id, usuarioData) => {
    try {
        const updatedUsuario = await Usuario.findByPk(usuario_id);
        if (!updatedUsuario) {
            return null; // Retorna null si no se encuentra el usuario
        }
        await updatedUsuario.update(usuarioData);
        return updatedUsuario;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un usuario por ID
const deleteUsuarioByIdController = async (usuario_id) => {
    try {
        const deletedUsuario = await Usuario.destroy({
            where: { usuario_id: usuario_id }
        });

        if (deletedUsuario === 0) {
            throw new Error('Usuario no encontrado');
        }

        return { message: 'Usuario eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
};

module.exports = {
    createUsuarioController,
    getAllUsuariosController,
    updatedUsuarioByIdController,
    deleteUsuarioByIdController
};