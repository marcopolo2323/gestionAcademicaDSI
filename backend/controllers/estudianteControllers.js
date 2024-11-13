const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado
const Usuario = require('../models/Usuario');
const Estudiante = require('../models/Estudiante');

const registerUserAndStudent = async (data) => {
    const { username, email, password, dni, nombres, apellidos, fecha_nacimiento, direccion, telefono } = data;

    try {
        // Hashear la contraseña antes de crear el usuario
        const passwordHash = await bcrypt.hash(password, 10); // 10 es el número de rondas de salting

        // Crear el usuario primero
        const nuevoUsuario = await Usuario.create({
            username,
            email,
            password_hash: passwordHash // Asegúrate de usar el nombre correcto del campo
        });
        const usuarioId = nuevoUsuario.usuario_id; // Obtener el ID del nuevo usuario

        // Crear el estudiante usando el usuarioId
        const newEstudiante = await Estudiante.create({
            usuario_id: usuarioId,
            dni,
            nombres,
            apellidos,
            fecha_nacimiento,
            direccion,
            telefono
        });

        return newEstudiante;
    } catch (error) {
        throw new Error(`Error al registrar estudiante: ${error.message}`);
    }
};

module.exports = { registerUserAndStudent };