const { DataTypes } = require('sequelize'); 
const sequelize = require('../db');
const Usuario = require('./Usuario'); // Importa el modelo Usuario

const Estudiante = sequelize.define('Estudiante', {
    estudiante_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: Usuario, // Referencia directa al modelo Usuario
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
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
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
            isIn: [['ACTIVO', 'INACTIVO', 'GRADUADO', 'RETIRADO']] // Validación para el estado
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ESTUDIANTES', 
    timestamps: false 
});

// Define la relación entre Estudiante y Usuario
Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Estudiante;
