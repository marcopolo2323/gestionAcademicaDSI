// routes/rolesRouter.js
const { Router } = require('express');
const {
    createRolController,
    getAllRolesController,
    updateRolByIdController,
    deleteRolByIdController
} = require('../controllers/RolesControllers');

const rolesRouter = Router();

rolesRouter.post("/", async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newRol = await createRolController({ nombre, descripcion });
        res.status(201).json(newRol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

rolesRouter.get("/", async (req, res) => {
    try {
        const roles = await getAllRolesController();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rolesRouter.put("/:rol_id", async (req, res) => {
    try {
        const { rol_id } = req.params;
        const updatedRol = await updateRolByIdController(rol_id, req.body);
        if (!updatedRol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

rolesRouter.delete("/:rol_id", async (req, res) => {
    try {
        const { rol_id } = req.params;
        const result = await deleteRolByIdController(rol_id);
        if (!result) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = rolesRouter;