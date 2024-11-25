const express = require('express');
const {
    createCicloController,
    getAllCiclosController,
    updatedCicloByIdController,
    deleteCicloByIdController
} = require('../controllers/cicloControllers'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para crear un nuevo Ciclo
router.post('/', async (req, res) => {
    try {
        const CicloData = req.body;
        const newCiclo = await createCicloController(CicloData);
        res.status(201).json(newCiclo); // Retorna el nuevo Ciclo creado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para obtener todos los Ciclos
router.get('/', async (req, res) => {
    try {
        const Ciclos = await getAllCiclosController();
        res.status(200).json(Ciclos); // Retorna la lista de Ciclos
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para actualizar un Ciclo por ID
router.put('/:Ciclo_id', async (req, res) => {
    try {
        const { Ciclo_id } = req.params;
        const CicloData = req.body;
        const updatedCiclo = await updatedCicloByIdController(Ciclo_id, CicloData);
        
        if (!updatedCiclo) {
            return res.status(404).json({ message: 'Ciclo no encontrado' }); // Manejo si no se encuentra el Ciclo
        }

        res.status(200).json(updatedCiclo); // Retorna el Ciclo actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

// Ruta para eliminar un Ciclo por ID
router.delete('/:Ciclo_id', async (req, res) => {
    try {
        const { Ciclo_id } = req.params;
        const response = await deleteCicloByIdController(Ciclo_id);
        
        if (!response) {
            return res.status(404).json({ message: 'Ciclo no encontrado' }); // Manejo si no se encuentra el Ciclo
        }

        res.status(200).json({ message: 'Ciclo eliminado con éxito' }); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
});

module.exports = router;