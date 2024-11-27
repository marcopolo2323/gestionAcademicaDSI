const express = require('express');
const {
    createPlanEstudioController,
    getAllPlanesEstudioController,
    updatedPlanEstudioByIdController,
    deletePlanEstudioByIdController
} = require('../controllers/PlanestudioControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo plan de estudio
router.post('/', async (req, res) => {
    try {
        console.log('Received Plan Data:', req.body);
        const newPlan = await createPlanEstudioController(req.body);
        res.status(201).json(newPlan);
    } catch (error) {
        console.error('Full Error Details:', error);
        res.status(400).json({ 
            message: error.message,
            details: error.errors ? error.errors.map(e => e.message) : null
        });
    }
});

// Ruta para obtener todos los planes de estudio
router.get('/', async (req, res) => {
    try {
        const planes = await getAllPlanesEstudioController();
        res.status(200).json(planes); // Retorna todos los planes
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un plan de estudio por ID
router.put('/:plan_id', async (req, res) => {
    const { plan_id } = req.params;
    try {
        const updatedPlan = await updatedPlanEstudioByIdController(plan_id, req.body);
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan de estudio no encontrado' }); // Si no se encuentra el plan
        }
        res.status(200).json(updatedPlan); // Retorna el plan actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un plan de estudio por ID
router.delete('/:plan_id', async (req, res) => {
    const { plan_id } = req.params;
    try {
        const result = await deletePlanEstudioByIdController(plan_id);
        res.status(200).json(result); // Mensaje de éxito
    } catch (error) {
        res.status(404).json({ message: error.message }); // Manejo de errores
    }
});

module.exports = router;