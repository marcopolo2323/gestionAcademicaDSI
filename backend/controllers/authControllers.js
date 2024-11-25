// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Roles');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Intentando autenticar usuario:', username);  // Debug log

    // Buscar usuario incluyendo el rol
    const user = await Usuario.findOne({
      where: { username, activo: true },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['nombre', 'descripcion']
      }]
    });
    
    if (!user) {
      console.log('Usuario no encontrado:', username);  // Debug log
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('Usuario encontrado, verificando contraseña');  // Debug log

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Contraseña incorrecta para usuario:', username);  // Debug log
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('Contraseña correcta, generando token');  // Debug log

    // Actualizar último login
    await user.update({ ultimo_login: new Date() });

    // Generar token JWT
    const token = jwt.sign(
      { 
        usuario_id: user.usuario_id,
        username: user.username,
        role: user.rol.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token generado exitosamente');  // Debug log

    // Enviar respuesta
    const response = {
      usuario_id: user.usuario_id,
      username: user.username,
      role: user.rol.nombre,
      token
    };

    console.log('Enviando respuesta:', { ...response, token: '***' });  // Debug log
    res.json(response);

  } catch (error) {
    console.error('Error detallado en login:', error);
    res.status(500).json({ 
      message: 'Error en el servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Middleware de autenticación
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};