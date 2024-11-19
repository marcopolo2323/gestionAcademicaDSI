    const Usuario = require('../models/Usuario'); // Asegúrate de que el modelo de Usuario esté definido correctamente
    const bcrypt = require('bcrypt')

    // Crea un nuevo usuario
    const createUsuarioController = async ({ username, password_hash, role }) => {
        const hashedPassword = await bcrypt.hash(password_hash, 10)
        try {
            const newUsuario = await Usuario.create({ username, password_hash:hashedPassword, role });
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

    const getUserByIdController = async (usuario_id) => {
        try {
            const usuarios = await Usuario.findByPk(usuario_id);
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

    const login = async (username, password) => {
        try {
            // Find user by username
            const user = await Usuario.findOne({ where: { username } });
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }

            return user;
        } catch (error) {
            throw error;
        }
    };

    module.exports = {
        createUsuarioController,
        getAllUsuariosController,
        getUserByIdController,
        updatedUsuarioByIdController,
        deleteUsuarioByIdController,
        login
    };