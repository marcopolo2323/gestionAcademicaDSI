const express = require('express');
const router = express.Router();
const {
    createMateriaController,
    getAllMateriasController,
    updatedMateriaByIdController,
    deleteMateriaByIdController
} = require('../controllers/materiaControllers'); // Asegúrate de que la ruta sea correcta

// Ruta para crear una nueva materia
router.post('/', async (req, res) => {
    try {
        const newMateria = await createMateriaController(req.body);
        res.status(201).json(newMateria); // Devuelve la materia creada con un estado 201
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todas las materias
router.get('/', async (req, res) => {
    try {
        const materias = await getAllMateriasController();
        res.status(200).json(materias); // Devuelve todas las materias con un estado 200
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar una materia por ID
router.put('/:materia_id', async (req, res) => {
    const { materia_id } = req.params;
    try {
        const updatedMateria = await updatedMateriaByIdController(materia_id, req.body);
        if (!updatedMateria) {
            return res.status(404).json({ message: 'Materia no encontrada' }); // Materia no encontrada
        }
        res.status(200).json(updatedMateria); // Devuelve la materia actualizada
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar una materia por ID
router.delete('/:materia_id', async (req, res) => {
    const { materia_id } = req.params;
    try {
        const response = await deleteMateriaByIdController(materia_id);
        res.status(200).json(response); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = router;