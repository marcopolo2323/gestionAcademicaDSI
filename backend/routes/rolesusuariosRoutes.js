const express = require('express');
const router = express.Router();
const {
    createRolUsuarioController,
    getAllRolUsuarioController,
    updatedRolUsuarioByIdController,
    deleteRolUsuarioByIdController
} = require('../controllers/rolesusuarioControllers'); // Asegúrate de que la ruta sea correcta

// Crear una nueva relación de rol-usuario
router.post('/', async (req, res) => {
    const { usuario_id, rol_id } = req.body;
    try {
        const newRolUsuario = await createRolUsuarioController({ usuario_id, rol_id });
        res.status(201).json(newRolUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todas las relaciones de rol-usuario
router.get('/', async (req, res) => {
    try {
        const rolesUsuarios = await getAllRolUsuarioController();
        res.status(200).json(rolesUsuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una relación de rol-usuario por ID
router.put('/:usuario_id/:rol_id', async (req, res) => {
    const { usuario_id, rol_id } = req.params;
    const rolData = req.body;
    try {
        const updatedRolUsuario = await updatedRolUsuarioByIdController(usuario_id, rol_id, rolData);
        if (!updatedRolUsuario) {
            return res.status(404).json({ message: 'Relación de rol-usuario no encontrada' });
        }
        res.status(200).json(updatedRolUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar una relación de rol-usuario por ID
router.delete('/:usuario_id/:rol_id', async (req, res) => {
    const { usuario_id, rol_id } = req.params;
    try {
        const response = await deleteRolUsuarioByIdController(usuario_id, rol_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;