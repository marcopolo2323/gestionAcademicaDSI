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
        allowNull: true, // Permitir nulos si no siempre se proporciona una matrícula
        references: {
            model: 'MATRICULAS', // Nombre de la tabla referenciada
            key: 'matricula_id'
        }
    },
    tipo_evaluacion: {
        type: DataTypes.STRING(50),
        allowNull: false // No permitir nulos para el tipo de evaluación
    },
    nota: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0, // Validación para que la nota sea mayor o igual a 0
            max: 20 // Validación para que la nota sea menor o igual a 20
        }
    },
    fecha: {
        type: DataTypes.DATEONLY, // Usar DATEONLY para solo fecha
        allowNull: false
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: true // Permitir nulos en observaciones
    }
}, {
    tableName: 'CALIFICACIONES', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Calificacion;