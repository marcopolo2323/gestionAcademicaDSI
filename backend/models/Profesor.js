const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Profesor = sequelize.define('Profesor', {
    profesor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: 'USUARIOS', // Nombre de la tabla referenciada
            key: 'usuario_id'
        }
    },
    dni: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false
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
            isEmail: true // Validación para asegurar que el formato del email es correcto
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'LICENCIA']] // Validación para el estado
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'PROFESORES', // Asegúrate de que el nombre de la tabla coincida con el de la base de datos
    timestamps: false // Si no tienes columnas de createdAt y updatedAt en tu tabla
});

// Definir la relación con el modelo Usuario si es necesario
Profesor.belongsTo(require('./Usuario'), { foreignKey: 'usuario_id' });

module.exports = Profesor;