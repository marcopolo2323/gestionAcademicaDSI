const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
            model: 'USUARIOS',
            key: 'usuario_id'
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
    dni: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false,
        validate: {
            len: [5, 15]
        }
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toString()
        }
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
            isEmail: true
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'GRADUADO', 'RETIRADO']]
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

module.exports = Estudiante;
