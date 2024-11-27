const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ciclo = sequelize.define('Ciclo', {
    ciclo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    numero_ciclo: {
        type: DataTypes.STRING(5),
        unique: true,
        allowNull: false,
        validate: {
            isIn: [['I', 'II', 'III', 'IV', 'V', 'VI']]
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
