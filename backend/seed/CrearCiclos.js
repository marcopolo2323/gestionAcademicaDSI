const Ciclo = require('../models/Ciclo');  // Asegúrate de que la ruta sea correcta

async function crearCiclosPreestablecidos() {
    const ciclosPreestablecidos = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    
    // Verifica si ya existen los ciclos preestablecidos
    for (let numeroCiclo of ciclosPreestablecidos) {
        const cicloExistente = await Ciclo.findOne({ where: { numero_ciclo: numeroCiclo } });
        
        if (!cicloExistente) {
            // Si no existe, crea el ciclo
            await Ciclo.create({
                numero_ciclo: numeroCiclo,
                estado: 'ACTIVO'
            });
            console.log(`Ciclo ${numeroCiclo} creado.`);
        } else {
            console.log(`Ciclo ${numeroCiclo} ya existe.`);
        }
    }
}

// Llamar a la función para crear los ciclos al inicio
crearCiclosPreestablecidos().catch(error => console.error(error));
