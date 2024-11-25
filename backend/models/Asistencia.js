// Asistencia.js - Modelo mejorado
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Asistencia = sequelize.define('Asistencia', {
    asistencia_id: {
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
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
        }
    },
    estado: {
        type: DataTypes.ENUM('PRESENTE', 'AUSENTE', 'JUSTIFICADO', 'ATRASO', 'PERMISO'),
        allowNull: false,
        defaultValue: 'AUSENTE'
    },
    hora_registro: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    minutos_atraso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 120
        }
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    documento_justificacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    }
}, {
    tableName: 'ASISTENCIAS',
    timestamps: false,
    indexes: [
        {
            fields: ['matricula_id', 'fecha'],
            unique: true
        }
    ]
});

module.exports=Asistencia;