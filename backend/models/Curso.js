const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Profesor = require('./Profesor'); // Importa el modelo Profesor

const Curso = sequelize.define('Curso', {
    curso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profesor, // Referencia directa al modelo Profesor
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
            isIn: [['ACTIVO', 'INACTIVO', 'FINALIZADO']]
        }
    }
}, {
    tableName: 'CURSOS', 
    timestamps: false 
});

// Definir relaciones
Curso.belongsTo(Profesor, { foreignKey: 'profesor_id' });

module.exports = Curso;
