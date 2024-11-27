// Calificacion.js - Modelo mejorado
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Calificacion = sequelize.define('Calificacion', {
    calificacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    matricula_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'MATRICULAS',
            key: 'matricula_id'
        }
    },
    tipo_evaluacion: {
        type: DataTypes.ENUM('PARCIAL', 'FINAL', 'PRACTICA', 'LABORATORIO', 'PROYECTO', 'TAREA'),
        allowNull: false
    },
    nota: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 20
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
        }
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    estado: {
        type: DataTypes.ENUM('REGISTRADO', 'ANULADO', 'EN_REVISION'),
        defaultValue: 'REGISTRADO'
    }
}, {
    tableName: 'CALIFICACIONES',
    timestamps: false,
    indexes: [
        {
            fields: ['matricula_id', 'tipo_evaluacion'],
            unique: true
        }
    ]
});

module.exports=Calificacion