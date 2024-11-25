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
// Definir las relaciones

// Relaciones de Usuario
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol',targetKey: 'rol_id'});
Usuario.hasOne(Estudiante, { foreignKey: 'usuario_id', as: 'estudiante' });
Usuario.hasOne(Profesor, { foreignKey: 'usuario_id', as: 'profesor' });
Usuario.hasOne(Admin, { foreignKey: 'usuario_id', as: 'admin' });

// Relaciones de Estudiante
Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Estudiante.hasMany(Matricula, { foreignKey: 'estudiante_id', as: 'matriculas' });
Estudiante.belongsTo(Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo' });
Ciclo.hasMany(Estudiante, { foreignKey: 'ciclo_id', as: 'estudiantes' });

// Relaciones de Profesor
Profesor.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Profesor.hasMany(Curso, { foreignKey: 'profesor_id', as: 'cursos' });
Profesor.belongsTo(Ciclo, { foreignKey: 'ciclo_id', as: 'ciclo' });
Ciclo.hasMany(Profesor, { foreignKey: 'ciclo_id', as: 'profesores' });

// Relaciones de Admin
Admin.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Relaciones de Carrera
Carrera.hasMany(PlanEstudio, { foreignKey: 'carrera_id', as: 'planesEstudio' });

// Relaciones de PlanEstudio
PlanEstudio.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' });

// Relaciones de Curso
Curso.belongsTo(Profesor, { foreignKey: 'profesor_id', as: 'profesor' });
Curso.belongsTo(Horario, { foreignKey: 'id_horario', as: 'horario' });
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
Horario.hasMany(Curso, { foreignKey: 'id_horario', as: 'cursos' });

// Sincronización de modelos (opcional)
// sequelize.sync({ force: false })
//   .then(() => console.log('Modelos sincronizados'))
//   .catch(error => console.error('Error al sincronizar modelos:', error));

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