const express = require('express');
const router = express.Router();
const {
    createAsistenciaController,
    getAllAsistenciasController,
    updatedAsistenciaByIdController,
    deleteAsistenciaByIdController
} = require('../controllers/AsistenciaControllers'); // Asegúrate de que la ruta sea correcta

// Ruta para crear una nueva asistencia
router.post('/', async (req, res) => {
    try {
        const asistenciaData = req.body; // Obtener datos del cuerpo de la solicitud
        const nuevaAsistencia = await createAsistenciaController(asistenciaData);
        res.status(201).json(nuevaAsistencia); // Retornar la nueva asistencia creada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todas las asistencias
router.get('/', async (req, res) => {
    try {
        const asistencias = await getAllAsistenciasController();
        res.status(200).json(asistencias); // Retornar todas las asistencias
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar una asistencia por ID
router.put('/:asistencia_id', async (req, res) => {
    try {
        const { asistencia_id } = req.params; // Obtener el ID de la asistencia de los parámetros
        const asistenciaData = req.body; // Obtener datos del cuerpo de la solicitud
        const updatedAsistencia = await updatedAsistenciaByIdController(asistencia_id, asistenciaData);
        
        if (!updatedAsistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' }); // Manejo si no se encuentra la asistencia
        }

        res.status(200).json(updatedAsistencia); // Retornar la asistencia actualizada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar una asistencia por ID
router.delete('/:asistencia_id', async (req, res) => {
    try {
        const { asistencia_id } = req.params; // Obtener el ID de la asistencia de los parámetros
        const response = await deleteAsistenciaByIdController(asistencia_id);
        res.status(200).json(response); // Mensaje de éxito
    } catch (error) {
        res.status(404).json({ error: error.message }); // Manejo si no se encuentra la asistencia o hay otro error
    }
});

module.exports = router;