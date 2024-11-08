// routes/usuarioRouter.js
const { Router } = require('express');
const {
    createUsuarioController,
    getAllUsuariosController,
    updatedUsuarioByIdController,
    deleteUsuarioByIdController
} = require('../controllers/usuarioControllers');

const usuarioRouter = Router();

// Crear un nuevo usuario
usuarioRouter.post("/", async (req, res) => {
    const { username, password_hash, email } = req.body; // No incluir 'usuario_id' si es auto-generado
    try {
        const newUsuario = await createUsuarioController({ username, password_hash, email });
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los usuarios
usuarioRouter.get("/", async (req, res) => {
    try {
        const usuarios = await getAllUsuariosController();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un usuario por ID
usuarioRouter.put("/:usuario_id", async (req, res) => {
    const { usuario_id } = req.params;
    const usuarioData = req.body;

    try {
        const updatedUsuario = await updatedUsuarioByIdController(usuario_id, usuarioData);
        if (!updatedUsuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un usuario por ID
usuarioRouter.delete("/:usuario_id", async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const deletedUsuario = await deleteUsuarioByIdController(usuario_id);
        if (!deletedUsuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204).send(); // Sin contenido
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = usuarioRouter;