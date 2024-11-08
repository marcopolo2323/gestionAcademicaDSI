const sequelize = require('../db')

//importar los modelos

const Usuario = require('./Usuario')
const Roles = require('./Roles')
const Roles_Usuarios =('./RolesUsuarios.js')



const db ={
    sequelize,
    Usuario,
    Roles,
    Roles_Usuarios
    
    
    //agregar si hay mas modelos aqui.
}

module.exports = db