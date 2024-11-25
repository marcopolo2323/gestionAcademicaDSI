const express = require('express');
const {
    createAdminController,
    getAllAdminsController,
    updatedAdminByIdController,
    deleteAdminByIdController
} = require('../controllers/adminControllers'); // Asegúrate de que la ruta al controlador sea correcta

const adminRouter = express.Router();

// Crear un nuevo estudiante
adminRouter.post('/', async (req, res) => {
    try {
        const adminData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const newAdmin = await createAdminController(adminData);
        res.status(201).json(newAdmin); // Responde con el nuevo estudiante creado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Obtener todos los admin
adminRouter.get('/', async (req, res) => {
    try {
        const admin = await getAllAdminsController();
        res.status(200).json(admin); // Responde con la lista de admin
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Actualizar un estudiante por ID
adminRouter.put('/:id', async (req, res) => {
    try {
        const admin_id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la ruta
        const adminData = req.body; // Obtiene los datos del cuerpo de la solicitud
        const updaateAdmin = await updatedAdminByIdController(admin_id, adminData);

        if (!updaateAdmin) {
            return res.status(404).json({ message: 'Estudiante no encontrado' }); // Si no se encuentra el estudiante
        }

        res.status(200).json(updaateAdmin); // Responde con el estudiante actualizado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

// Eliminar un estudiante por ID
adminRouter.delete('/:id', async (req, res) => {
    try {
        const admin_id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la ruta
        const result = await deleteAdminByIdController(admin_id);

        res.status(200).json(result); // Responde con el mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Manejo de errores
    }
});

module.exports = adminRouter;