// Carrera.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Carrera = sequelize.define('Carrera', {
    carrera_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    duracion_semestres: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 12
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO']]
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'CARRERAS',
    timestamps: false,
    indexes: [
        { fields: ['nombre'] }
    ]
});

module.exports = Carrera;