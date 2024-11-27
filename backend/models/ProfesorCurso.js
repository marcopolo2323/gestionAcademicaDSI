const ProfesorCurso = sequelize.define('ProfesorCurso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PROFESORES',
            key: 'profesor_id'
        }
    },
    curso_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'CURSOS',
            key: 'curso_id'
        }
    },
}, {
    tableName: 'PROFESOR_CURSO',
    timestamps: false
});
