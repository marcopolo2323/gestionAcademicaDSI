const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Ruta de login
router.post('/usuario/login', async (req, res) => {
  try {
    console.log('Intento de login - Datos recibidos:', req.body);
    await authController.login(req, res);
  } catch (error) {
    console.error('Error en ruta de login:', error);
    res.status(500).json({ 
      message: 'Error en el proceso de login', 
      error: error.message 
    });
  }
});

// Ruta de validación de token
router.get('/validate-token', authController.authenticateToken, (req, res) => {
  try {
    res.json({ 
      valid: true, 
      user: { 
        id: req.user.usuario_id, 
        username: req.user.username, 
        role: req.user.role 
      } 
    });
  } catch (error) {
    console.error('Error en validación de token:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Error en validación de token' 
    });
  }
});

module.exports = router;