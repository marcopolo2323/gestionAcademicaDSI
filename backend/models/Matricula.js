// Matricula.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Matricula = sequelize.define('Matricula', {
    matricula_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ESTUDIANTES',
            key: 'estudiante_id'
        }
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CURSOS',
            key: 'curso_id'
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
    fecha_matricula: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true
        }
    },
    nota_final: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0.0,
            max: 20.0
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'MATRICULADO',
        validate: {
            isIn: [['MATRICULADO', 'APROBADO', 'REPROBADO', 'RETIRADO']]
        }
    }
}, {
    tableName: 'MATRICULAS',
    timestamps: false,
    indexes: [
        { fields: ['estudiante_id'] },
        { fields: ['curso_id'] }
    ]
});

module.exports = Matricula;