const express = require('express');
// Asegúrate de que el controlador correcto esté importado
const { addTeacher } = require('../controllers/profesorControllers');  // Cambié 'estudianteControllers' por 'profesorControllers'

const profesorrouter = express.Router();

// Ruta POST para agregar un nuevo profesor
profesorrouter.post('/', async (req, res) => {
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
