const express = require('express');
const router = express.Router();
const {
    createMatriculaController,
    getAllMatriculasController,
    updatedMatriculaByIdController,
    deleteMatriculaByIdController
} = require('../controllers/MatriculaControllers'); // Asegúrate de que la ruta sea correcta

// Ruta para crear una nueva matrícula
router.post('/', async (req, res) => {
    try {
        const newMatricula = await createMatriculaController(req.body);
        res.status(201).json(newMatricula); // Retorna la matrícula creada con un código 201
    } catch (error) {
        res.status(400).json({ error: error.message }); // Retorna un error si ocurre
    }
});

// Ruta para obtener todas las matrículas
router.get('/', async (req, res) => {
    try {
        const matriculas = await getAllMatriculasController();
        res.status(200).json(matriculas); // Retorna todas las matrículas con un código 200
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna un error si ocurre
    }
});

// Ruta para actualizar una matrícula por ID
router.put('/:matricula_id', async (req, res) => {
    const { matricula_id } = req.params;
    try {
        const updatedMatricula = await updatedMatriculaByIdController(matricula_id, req.body);
        if (!updatedMatricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' }); // Retorna un mensaje si no se encuentra la matrícula
        }
        res.status(200).json(updatedMatricula); // Retorna la matrícula actualizada con un código 200
    } catch (error) {
        res.status(400).json({ error: error.message }); // Retorna un error si ocurre
    }
});

// Ruta para eliminar una matrícula por ID
router.delete('/:matricula_id', async (req, res) => {
    const { matricula_id } = req.params;
    try {
        const response = await deleteMatriculaByIdController(matricula_id);
        res.status(200).json(response); // Retorna el mensaje de éxito con un código 200
    } catch (error) {
        res.status(404).json({ error: error.message }); // Retorna un error si ocurre
    }
});

module.exports = router;