const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Carrera = require('./Carrera'); // Importa el modelo Carrera

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
            model: Carrera, // Referencia directa al modelo Carrera
            key: 'carrera_id'
        }
    },
    codigo: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO']] // Validación para el estado
        }
    }
}, {
    tableName: 'PLANES_ESTUDIO',
    timestamps: false
});

// Define la relación entre PlanEstudio y Carrera
PlanEstudio.belongsTo(Carrera, { foreignKey: 'carrera_id' });

module.exports = PlanEstudio;
