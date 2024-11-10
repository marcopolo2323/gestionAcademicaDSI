const express = require('express');
const {
    createCarreraController,
    getAllCarrerasController,
    updatedCarreraByIdController,
    deleteCarreraByIdController
} = require('../controllers/carreraControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear una nueva carrera
router.post('/', async (req, res) => {
    try {
        const carreraData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const newCarrera = await createCarreraController(carreraData);
        res.status(201).json(newCarrera); // Respuesta con el nuevo registro creado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todas las carreras
router.get('/', async (req, res) => {
    try {
        const carreras = await getAllCarrerasController();
        res.status(200).json(carreras); // Respuesta con todas las carreras
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar una carrera por ID
router.put('/:id', async (req, res) => {
    try {
        const carrera_id = req.params.id; // Obtiene el ID de la URL
        const carreraData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const updatedCarrera = await updatedCarreraByIdController(carrera_id, carreraData);
        
        if (!updatedCarrera) {
            return res.status(404).json({ message: 'Carrera no encontrada' }); // Manejo si no se encuentra la carrera
        }
        
        res.status(200).json(updatedCarrera); // Respuesta con la carrera actualizada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar una carrera por ID
router.delete('/:id', async (req, res) => {
    try {
        const carrera_id = req.params.id; // Obtiene el ID de la URL
        const result = await deleteCarreraByIdController(carrera_id);
        
        res.status(200).json(result); // Respuesta con mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = router;