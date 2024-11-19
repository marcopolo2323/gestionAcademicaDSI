const express = require('express');
const {
    createEstudianteController,
    getAllEstudiantesController,
    updatedEstudianteByIdController,
    deleteEstudianteByIdController
} = require('../controllers/estudianteControllers'); // Asegúrate de que la ruta al controlador sea correcta

const estudianterouter = express.Router();

estudianterouter.post('/', async (req, res) => {
    try {
        const nuevoEstudiante = await registerUserAndStudent(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = estudianterouter;