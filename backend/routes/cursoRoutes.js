const express = require('express');
const {
    createCursoController,
    getAllCursosController,
    updatedCursoByIdController,
    deleteCursoByIdController,
    getCursosByCicloController
} = require('../controllers/CursoControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo curso
router.post('/', async (req, res) => {
    try {
        const cursoData = req.body;
        const newCurso = await createCursoController(cursoData);
        res.status(201).json(newCurso); // Retorna el nuevo curso creado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const cursos = await getAllCursosController();
        res.status(200).json(cursos); // Retorna la lista de cursos
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un curso por ID
router.put('/:curso_id', async (req, res) => {
    try {
        const { curso_id } = req.params;
        const cursoData = req.body;
        const updatedCurso = await updatedCursoByIdController(curso_id, cursoData);
        
        if (!updatedCurso) {
            return res.status(404).json({ message: 'Curso no encontrado' }); // Manejo si no se encuentra el curso
        }

        res.status(200).json(updatedCurso); // Retorna el curso actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un curso por ID
router.delete('/:curso_id', async (req, res) => {
    try {
        const { curso_id } = req.params;
        const response = await deleteCursoByIdController(curso_id);
        res.status(200).json(response); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para obtener cursos por ciclo
router.get('/ciclo/:ciclo_id', getCursosByCicloController);

module.exports = router;