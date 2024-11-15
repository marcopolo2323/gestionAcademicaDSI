const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./Usuario'); // Importar el modelo Usuario

const Profesor = sequelize.define('Profesor', {
    profesor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Referencia directa al modelo Usuario
            key: 'usuario_id'
        },
        unique: true // Asegura que cada profesor esté vinculado a un único usuario
    },
    dni: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isEmail: true // Asegura que el formato de email sea válido
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'LICENCIA']]
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'PROFESORES',
    timestamps: false
});

// Definir la relación con el modelo Usuario
Profesor.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Profesor;
