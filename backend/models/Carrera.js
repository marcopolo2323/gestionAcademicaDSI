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
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duracion_semestres: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO']] // Validación para el estado
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'CARRERAS', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Carrera;