// PlanEstudio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PlanEstudio = sequelize.define('PlanEstudio', {
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CARRERAS',
            key: 'carrera_id'
        }
    },
    ciclo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CICLOS',
            key: 'ciclo_id'
        }
    },    
    codigo: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO']]
        }
    }
}, {
    tableName: 'PLANES_ESTUDIO',
    timestamps: false,
    indexes: [
        { fields: ['carrera_id'] },
        { fields: ['codigo'] }
    ]
});

module.exports = PlanEstudio;