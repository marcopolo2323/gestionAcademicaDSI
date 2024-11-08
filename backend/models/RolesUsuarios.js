const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Modelo para la tabla Roles_Usuarios
const RolesUsuarios = sequelize.define('RolesUsuarios', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'USUARIOS', // Nombre de la tabla referenciada
            key: 'usuario_id'  // Columna referenciada
        }
    },
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'ROLES', // Nombre de la tabla referenciada
            key: 'rol_id'   // Columna referenciada
        }
    }
}, {
    tableName: 'ROLES_USUARIOS', // Nombre de la tabla en la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

module.exports = RolesUsuarios;