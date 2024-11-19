// routes/rolesRouter.js
const { Router } = require('express');
const {
    createRolController,
    getAllRolesController,
    updatedRolByIdController,
    deleteRolByIdController
} = require('../controllers/RolesControllers'); // Asegúrate de que la ruta sea correcta

const rolesRouter = Router();

// Crear un nuevo rol
rolesRouter.post("/", async (req, res) => {
    const { nombre, descripcion } = req.body; // No incluir 'rol_id' si es auto-generado
    try {
        const newRol = await createRolController({ nombre, descripcion });
        res.status(201).json(newRol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los roles
rolesRouter.get("/", async (req, res) => {
    try {
        const roles = await getAllRolesController();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un rol por ID
rolesRouter.put("/:rol_id", async (req, res) => {
    const { rol_id } = req.params;
    const rolData = req.body;

    try {
        const updatedRol = await updatedRolByIdController(rol_id, rolData);
        if (!updatedRol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un rol por ID
rolesRouter.delete("/:rol_id", async (req, res) => {
    const { rol_id } = req.params;

    try {
        const deletedRol = await deleteRolByIdController(rol_id);
        if (!deletedRol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(204).send(); // Sin contenido
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = rolesRouter;