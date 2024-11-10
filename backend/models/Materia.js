const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Materia = sequelize.define('Materia', {
    materia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permitir nulos si no siempre se asigna un plan
        references: {
            model: 'PLANES_ESTUDIO', // Nombre de la tabla referenciada
            key: 'plan_id' // Clave primaria de la tabla referenciada
        }
    },
    codigo: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horas_teoricas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horas_practicas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prerequisitos: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'MATERIAS', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Materia;