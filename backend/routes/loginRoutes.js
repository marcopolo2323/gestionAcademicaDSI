const express = require('express');
const router = express.Router();
const {
    createLoginController,
    getAllLoginsController,
    updatedLoginByIdController,
    deleteLoginByIdController
} = require('../controllers/loginControllers'); // Asegúrate de que la ruta sea correcta

// Ruta para crear un nuevo registro de inicio de sesión
router.post('/logins', async (req, res) => {
    try {
        const newLogin = await createLoginController(req.body);
        res.status(201).json(newLogin); // Retorna el nuevo registro creado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todos los registros de inicio de sesión
router.get('/logins', async (req, res) => {
    try {
        const logins = await getAllLoginsController();
        res.status(200).json(logins); // Retorna la lista de registros
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un registro de inicio de sesión por ID
router.put('/logins/:login_id', async (req, res) => {
    const { login_id } = req.params;
    try {
        const updatedLogin = await updatedLoginByIdController(login_id, req.body);
        if (!updatedLogin) {
            return res.status(404).json({ message: 'Registro no encontrado' }); // Si no se encuentra el registro
        }
        res.status(200).json(updatedLogin); // Retorna el registro actualizado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un registro de inicio de sesión por ID
router.delete('/logins/:login_id', async (req, res) => {
    const { login_id } = req.params;
    try {
        const response = await deleteLoginByIdController(login_id);
        res.status(200).json(response); // Mensaje de éxito
    } catch (error) {
        res.status(404).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = router;