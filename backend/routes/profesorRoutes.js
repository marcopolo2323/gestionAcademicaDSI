const express = require('express');
const {
    createProfesorController,
    getAllProfesoresController,
    updatedProfesorByIdController,
    deleteProfesorByIdController
} = require('../controllers/profesorControllers'); // Asegúrate de que la ruta sea correcta

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
        // Asegúrate de que la función addTeacher reciba correctamente el cuerpo de la solicitud
        const nuevoProfesor = await addTeacher(req.body);  // Usando addTeacher en lugar de registerUserAndProfessor
        
        // Si todo sale bien, devolver el nuevo profesor creado
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        // Manejo de errores
        console.error('Error al agregar el profesor:', error);
        res.status(400).json({ error: error.message || 'Hubo un error al agregar el profesor' });
    }
});

module.exports = profesorrouter;
