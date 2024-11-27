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
            model: 'ESTUDIANTES', // Nombre de la tabla de estudiantes
            key: 'estudiante_id'
        }
    }, 
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CURSOS', // Nombre de la tabla de cursos
            key: 'curso_id'
        }
    },
    ciclo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CICLOS', // Nombre de la tabla de ciclos
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
        { fields: ['curso_id'] },
        { fields: ['ciclo_id'] }
    ]
});

module.exports = Matricula;
