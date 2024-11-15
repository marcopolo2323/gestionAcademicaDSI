const express = require('express');
const {
    createProfesorController,
    getAllProfesoresController,
    updatedProfesorByIdController,
    deleteProfesorByIdController
} = require('../controllers/ProfesorControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo profesor
router.post('/', async (req, res) => {
    try {
        const profesorData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const newProfesor = await createProfesorController(profesorData);
        res.status(201).json(newProfesor); // Retorna el nuevo profesor creado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todos los profesores
router.get('/', async (req, res) => {
    try {
        const profesores = await getAllProfesoresController();
        res.status(200).json(profesores); // Retorna la lista de profesores
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un profesor por ID
router.put('/:id', async (req, res) => {
    try {
        const profesor_id = req.params.id; // Obtiene el ID del profesor de los parámetros de la URL
        const profesorData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const updatedProfesor = await updatedProfesorByIdController(profesor_id, profesorData);
        
        if (!updatedProfesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' }); // Manejo si no se encuentra el profesor
        }

        res.status(200).json(updatedProfesor); // Retorna el profesor actualizado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un profesor por ID
router.delete('/:id', async (req, res) => {
    try {
        const profesor_id = req.params.id; // Obtiene el ID del profesor de los parámetros de la URL
        const response = await deleteProfesorByIdController(profesor_id);
        res.status(200).json(response); // Mensaje de éxito al eliminar
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = router;