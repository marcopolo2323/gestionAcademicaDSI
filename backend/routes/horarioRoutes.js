const express = require('express');
const {
    createHorarioController,
    getAllHorariosController,
    updatedHorarioByIdController,
    deleteHorarioByIdController
} = require('../controllers/HorarioControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo horario
router.post('/', async (req, res) => {
    try {
        const horarioData = req.body;
        const newHorario = await createHorarioController(horarioData);
        res.status(201).json(newHorario); // Retorna el nuevo horario creado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todos los horarios
router.get('/', async (req, res) => {
    try {
        const horarios = await getAllHorariosController();
        res.status(200).json(horarios); // Retorna la lista de horarios
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un horario por ID
router.put('/:horario_id', async (req, res) => {
    try {
        const { horario_id } = req.params;
        const horarioData = req.body;
        const updatedHorario = await updatedHorarioByIdController(horario_id, horarioData);
        
        if (!updatedHorario) {
            return res.status(404).json({ message: 'Horario no encontrado' }); // Manejo si no se encuentra el horario
        }

        res.status(200).json(updatedHorario); // Retorna el horario actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un horario por ID
router.delete('/:horario_id', async (req, res) => {
    try {
        const { horario_id } = req.params;
        const response = await deleteHorarioByIdController(horario_id);
        
        if (!response) {
            return res.status(404).json({ message: 'Horario no encontrado' }); // Manejo si no se encuentra el horario
        }

        res.status(200).json({ message: 'Horario eliminado con éxito' }); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

module.exports = router;