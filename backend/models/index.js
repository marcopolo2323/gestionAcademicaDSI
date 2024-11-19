const sequelize = require('../db');

// Importar los modelos
const Usuario = require('./Usuario');
const Rol = require('./Roles');  // Cambié "Roles" a "Rol" para mantener consistencia
const Estudiante = require('./Estudiante');
const Profesor = require('./Profesor');
const Carrera = require('./Carrera');
const PlanEstudio = require('./PlanEstudio');
const Curso = require('./Curso');
const Matricula = require('./Matricula');
const Asistencia = require('./Asistencia');
const Calificacion = require('./Calificacion');

// Exportar la instancia de sequelize junto con todos los modelos
const db = {
    sequelize,
    Usuario,
    Rol,
    Estudiante,
    Profesor,
    Carrera,
    PlanEstudio,
    Curso,
    Matricula,
    Asistencia,
    Calificacion,
    // Agrega otros modelos aquí si es necesario
};

module.exports = db;
