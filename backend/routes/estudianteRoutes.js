const express = require('express');
const {
    createEstudianteController,
    getAllEstudiantesController,
    updatedEstudianteByIdController,
    deleteEstudianteByIdController
} = require('../controllers/EstudianteControllers'); // Asegúrate de que la ruta al controlador sea correcta

const estudianterouter = express.Router();

// Crear un nuevo estudiante
estudianterouter.post('/', async (req, res) => {
    try {
        const estudianteData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const newEstudiante = await createEstudianteController(estudianteData);
        res.status(201).json(newEstudiante); // Responde con el nuevo estudiante creado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Obtener todos los estudiantes
estudianterouter.get('/', async (req, res) => {
    try {
        const estudiantes = await getAllEstudiantesController();
        res.status(200).json(estudiantes); // Responde con la lista de estudiantes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Actualizar un estudiante por ID
estudianterouter.put('/:id', async (req, res) => {
    try {
        const estudiante_id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la ruta
        const estudianteData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const updatedEstudiante = await updatedEstudianteByIdController(estudiante_id, estudianteData);

        if (!updatedEstudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' }); // Si no se encuentra el estudiante
        }

        res.status(200).json(updatedEstudiante); // Responde con el estudiante actualizado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Eliminar un estudiante por ID
estudianterouter.delete('/:id', async (req, res) => {
    try {
        const estudiante_id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la ruta
        const result = await deleteEstudianteByIdController(estudiante_id);

        res.status(200).json(result); // Responde con el mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = estudianterouter;