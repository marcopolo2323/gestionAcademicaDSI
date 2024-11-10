const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Curso = sequelize.define('Curso', {
    curso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    materia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MATERIAS', // Nombre de la tabla referenciada
            key: 'materia_id'
        }
    },
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PROFESORES', // Nombre de la tabla referenciada
            key: 'profesor_id'
        }
    },
    periodo_academico: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    paralelo: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    cupo_maximo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    aula: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'FINALIZADO']] // Validación para el estado
        }
    }
}, {
    tableName: 'CURSOS', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Curso;