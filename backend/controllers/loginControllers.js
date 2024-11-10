const Login = require('../models/Login'); // Asegúrate de que el modelo de Login esté definido correctamente

// Crea un nuevo registro de inicio de sesión
const createLoginController = async ({login_id, usuario_id, fecha_login, ip_address, estado, intento }) => {
    try {
        const newLogin = await Login.create({login_id, usuario_id,fecha_login, ip_address, estado, intento });
        return newLogin;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los registros de inicio de sesión
const getAllLoginsController = async () => {
    try {
        const logins = await Login.findAll(); // Obtiene todos los registros de inicio de sesión
        return logins;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un registro de inicio de sesión por ID
const updatedLoginByIdController = async (login_id, loginData) => {
    try {
        const updatedLogin = await Login.findByPk(login_id);
        if (!updatedLogin) {
            return null; // Retorna null si no se encuentra el registro
        }
        await updatedLogin.update(loginData);
        return updatedLogin;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar un registro de inicio de sesión por ID
const deleteLoginByIdController = async (login_id) => {
    try {
        const deletedLogin = await Login.destroy({
            where: { login_id: login_id }
        });

        if (deletedLogin === 0) {
            throw new Error('Registro de inicio de sesión no encontrado');
        }

        return { message: 'Registro de inicio de sesión eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(`Error al eliminar el registro: ${error.message}`);
    }
};

module.exports = {
    createLoginController,
    getAllLoginsController,
    updatedLoginByIdController,
    deleteLoginByIdController
};