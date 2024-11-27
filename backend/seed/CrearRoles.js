const Rol = require('../models/Roles');  // Asegúrate de que la ruta sea correcta

async function seedRoles() {
    const roles = [
        { nombre: 'ROLE_STUDENT', descripcion: 'Rol para estudiantes' },
        { nombre: 'ROLE_TEACHER', descripcion: 'Rol para profesores' },
        { nombre: 'ROLE_ADMIN', descripcion: 'Rol para administradores' }
    ];

    for (let rol of roles) {
        // Verifica si el rol ya existe en la base de datos
        const rolExistente = await Rol.findOne({ where: { nombre: rol.nombre } });
        
        if (!rolExistente) {
            // Si no existe, crea el rol
            await Rol.create(rol);
            console.log(`Rol ${rol.nombre} creado.`);
        } else {
            console.log(`Rol ${rol.nombre} ya existe.`);
        }
    }
}

// Ejecutar la función para crear los roles
seedRoles().catch(error => console.error('Error al crear roles:', error));
