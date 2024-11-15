const express = require('express');
const router = express.Router();
const {
    createCalificacionController,
    getAllCalificacionesController,
    updatedCalificacionByIdController,
    deleteCalificacionByIdController
} = require('../controllers/CalificacionControllers'); // Asegúrate de que la ruta sea correcta

// Ruta para crear una nueva calificación
router.post('/', async (req, res) => {
    try {
        const newCalificacion = await createCalificacionController(req.body);
        res.status(201).json(newCalificacion); // Retorna la nueva calificación creada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todas las calificaciones
router.get('/', async (req, res) => {
    try {
        const calificaciones = await getAllCalificacionesController();
        res.status(200).json(calificaciones); // Retorna todas las calificaciones
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar una calificación por ID
router.put('/:calificacion_id', async (req, res) => {
    try {
        const updatedCalificacion = await updatedCalificacionByIdController(req.params.calificacion_id, req.body);
        if (!updatedCalificacion) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }
        res.status(200).json(updatedCalificacion); // Retorna la calificación actualizada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar una calificación por ID
router.delete('/:calificacion_id', async (req, res) => {
    try {
        const response = await deleteCalificacionByIdController(req.params.calificacion_id);
        res.status(200).json(response); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = router;