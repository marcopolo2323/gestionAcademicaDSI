// routes/index.js
const express = require('express');
const router = express.Router();
const { 
    AsistenciaControllers, 
    CalificacionControllers, 
    CarreraControllers, 
    CursoControllers,
    EstudianteControllers,
    MatriculaControllers,
    PlanEstudioControllers,
    ProfesorControllers, 
    RolesControllers,
    UsuarioControllers
} = require('../controllers');

router.use('/asistencia', require('./AsistenciaRoutes'));
router.use('/calificacion', require('./CalificacionRoutes'));
router.use('/carrera', require('./CarreraRoutes'));
router.use('/curso', require('./CursoRoutes'));
router.use('/estudiante', require('./EstudianteRoutes'));
router.use('/matricula', require('./MatriculaRoutes'));
router.use('/planestudio', require('./PlanestudioRoutes'));
router.use('/profesor', require('./ProfesorRoutes'));
router.use('/roles', require('./RolesRoutes'));
router.use('/usuario', require('./UsuarioRoutes'));

module.exports = router;
