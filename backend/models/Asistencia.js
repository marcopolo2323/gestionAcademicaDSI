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
        allowNull: true, // Permitir nulos si no siempre se proporciona una matrícula
        references: {
            model: 'MATRICULAS', // Nombre de la tabla referenciada
            key: 'matricula_id'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY, // Usar DATEONLY para solo fecha
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['PRESENTE', 'AUSENTE', 'JUSTIFICADO', 'ATRASO']] // Validación para el estado
        }
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: true // Permitir nulos en observaciones
    }
}, {
    tableName: 'ASISTENCIAS', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Asistencia;