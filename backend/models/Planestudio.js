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
            model: 'CARRERAS', // Nombre de la tabla referenciada
            key: 'carrera_id'   // Clave primaria de la tabla referenciada
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
    tableName: 'PLANES_ESTUDIO', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = PlanEstudio;