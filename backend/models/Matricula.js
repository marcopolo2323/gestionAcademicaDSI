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
            model: 'ESTUDIANTES', // Nombre de la tabla referenciada
            key: 'estudiante_id'
        }
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CURSOS', // Nombre de la tabla referenciada
            key: 'curso_id'
        }
    },
    fecha_matricula: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nota_final: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'MATRICULADO',
        validate: {
            isIn: [['MATRICULADO', 'APROBADO', 'REPROBADO', 'RETIRADO']] // Validación para el estado
        }
    }
}, {
    tableName: 'MATRICULAS', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Exportar el modelo
module.exports = Matricula;