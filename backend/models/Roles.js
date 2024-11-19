const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Modelo para Roles
const Rol = sequelize.define('Rol', {
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'ROLES',
    timestamps: false
});

module.exports = Rol;
