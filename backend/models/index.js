const sequelize = require('../db')

//importar los modelos

const Usuario = require('./Usuario')
const Roles = require('./Roles')
const Roles_Usuarios =('./RolesUsuarios.js')
const Estudiante=('./Estudiante.js')
const Profesor=('./Profesor.js')
const Carrera=('./Carrera.js')
const Planestudio=('./Planestudio.js')
const Materia=('./Materia.js')
const CURSO=('./Curso.js')
const Matricula=('./Matricula.js')
const Asistencia=('./Asistencia.js')
const Calificacion=('./Calificacion.js')



const db ={
    sequelize,
    Usuario,
    Roles,
    Roles_Usuarios,
    Estudiante,
    Profesor,
    Carrera,
    Planestudio,
    Materia,
    CURSO,
    Matricula,
    Asistencia,
    Calificacion
    
    
    //agregar si hay mas modelos aqui.
}

module.exports = db