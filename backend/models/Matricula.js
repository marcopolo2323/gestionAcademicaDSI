const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Estudiante = require('./Estudiante'); // Importar modelo de Estudiante
const Curso = require('./Curso'); // Importar modelo de Curso

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
            model: Estudiante, // Referencia al modelo de Estudiante
            key: 'estudiante_id'
        }
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Curso, // Referencia al modelo de Curso
            key: 'curso_id'
        }
    },
    fecha_matricula: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valor por defecto de la fecha actual
        validate: {
            isDate: true
        }
    },
    nota_final: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0.0,
            max: 100.0
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
    timestamps: false 
});

// Definir asociaciones (si no están definidas en otro archivo)
Matricula.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });
Matricula.belongsTo(Curso, { foreignKey: 'curso_id' });

// Exportar el modelo
module.exports = Matricula;
