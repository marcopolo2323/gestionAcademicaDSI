const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ciclo = sequelize.define('Ciclo', {
    ciclo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_ciclo: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
            min: 1, 
            max: 6
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'ACTIVO',
        validate: {
            isIn: [['ACTIVO', 'INACTIVO']]
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'CICLOS',
    timestamps: false
});

module.exports = Ciclo;
