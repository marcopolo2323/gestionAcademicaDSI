// Roles.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Rol = sequelize.define('Rol', {
    rol_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 50]
        }
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'ROLES',
    timestamps: false
});

module.exports = Rol;