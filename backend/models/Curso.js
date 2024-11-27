// Curso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Curso = sequelize.define('Curso', {
    curso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PLANES_ESTUDIO',
            key: 'plan_id'
        }
    },
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'PROFESORES',
            key: 'profesor_id'
        }
    },
    horario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'HORARIOS',
            key: 'horario_id'
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
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
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
        allowNull: false,
        validate: {
            min: 0
        }
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
    timestamps: false,
    indexes: [
        { fields: ['plan_id'] },
        { fields: ['profesor_id'] },
        { fields: ['horario_id'] },
        { fields: ['codigo'] }
    ]
});

module.exports = Curso;