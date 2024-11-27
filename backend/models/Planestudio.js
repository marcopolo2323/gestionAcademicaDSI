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
    codigo: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
        validate: { 
            len: [2, 20]
        } 
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'EN REVISIÓN']]
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