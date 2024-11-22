const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciclo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    hora: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lunes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    martes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    miercoles: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    jueves: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    viernes: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'horarios',
    timestamps: false
});

// Exportar el modelo Horario
module.exports = Horario;