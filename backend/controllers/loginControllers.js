const User = require('../models/Usuario'); // Supón que tienes un modelo de Usuario
const jwt = require('jsonwebtoken'); // JWT para generar tokens de autenticación
const bcrypt = require('bcrypt'); // Bcrypt para verificar contraseñas

const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
        return { token, user };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { authenticateUser };
