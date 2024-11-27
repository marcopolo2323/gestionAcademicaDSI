const sequelize = require('../db');

// Importar todos los modelos
const Usuario = require('./Usuario');
const Rol = require('./Roles');
const Estudiante = require('./Estudiante');
const Profesor = require('./Profesor');
const Admin = require('./Admin');
const Carrera = require('./Carrera');
const PlanEstudio = require('./Planestudio');
const Curso = require('./Curso');
const Matricula = require('./Matricula');
const Asistencia = require('./Asistencia');
const Calificacion = require('./Calificacion');
const Horario = require('./Horario');
const Ciclo = require('./Ciclo');

// Relaciones de Usuario
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });
Usuario.hasOne(Estudiante, { foreignKey: 'usuario_id', as: 'estudiante' });
Usuario.hasOne(Profesor, { foreignKey: 'usuario_id', as: 'profesor' }); 
Usuario.hasOne(Admin, { foreignKey: 'usuario_id', as: 'admin' });

// Relaciones de Estudiante
Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Estudiante.hasMany(Matricula, { foreignKey: 'estudiante_id', as: 'matriculas' });
Estudiante.belongsTo(Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo' });

// Relaciones de Ciclo
Ciclo.hasMany(Estudiante, { foreignKey: 'ciclo_id', as: 'estudiantes' });
Ciclo.hasMany(Curso, { foreignKey: 'ciclo_id', as: 'cursos' });

// Relaciones de Profesor
Profesor.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Profesor.hasMany(Curso, { foreignKey: 'profesor_id', as: 'cursos' });

// Relaciones de Admin
Admin.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Relaciones de Carrera y PlanEstudio
Carrera.hasMany(PlanEstudio, { foreignKey: 'carrera_id', as: 'planesEstudio' });
PlanEstudio.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' });

// Relaciones de Curso
Curso.belongsTo(Profesor, { foreignKey: 'profesor_id', as: 'profesor' });
Curso.belongsTo(Horario, { foreignKey: 'horario_id', as: 'horario' });
Curso.belongsTo(Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo' });
Curso.hasMany(Matricula, { foreignKey: 'curso_id', as: 'matriculas' });

// Relaciones de Matricula
Matricula.belongsTo(Estudiante, { foreignKey: 'estudiante_id', as: 'estudiante' });
Matricula.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });
Matricula.hasMany(Asistencia, { foreignKey: 'matricula_id', as: 'asistencias' });
Matricula.hasMany(Calificacion, { foreignKey: 'matricula_id', as: 'calificaciones' });

// Relaciones de Asistencia
Asistencia.belongsTo(Matricula, { foreignKey: 'matricula_id', as: 'matricula' });

// Relaciones de Calificacion
Calificacion.belongsTo(Matricula, { foreignKey: 'matricula_id', as: 'matricula' });

// Relaciones de Horario
Horario.hasMany(Curso, { foreignKey: 'horario_id', as: 'cursos' });

// Exportar todos los modelos y la instancia de sequelize
module.exports = {
    sequelize,
    Usuario,
    Rol,
    Estudiante,
    Profesor,
    Admin,
    Carrera,
    PlanEstudio,
    Curso,
    Matricula,
    Asistencia,
    Calificacion,
    Horario,
    Ciclo
};