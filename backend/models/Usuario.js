// Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 50]
        }
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ROLES',
            key: 'rol_id',
        }
    },
    ultimo_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'USUARIOS',
    timestamps: false,
    indexes: [
        { fields: ['username'] },
        { fields: ['rol_id'] }
    ]
});

module.exports = Usuario;