const mongoose = require('mongoose');

// Definir el esquema para el modelo de Juego
const juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del juego es obligatorio'],
        trim: true, // Elimina espacios en blanco al inicio y al final
        unique: true // Asegura que el nombre sea único
    },
    genero: { type: String, required: true },
    plataforma: { type: String, required: [true, 'La plataforma es obligatoria'] },
    portadaUrl: { type: String, required: false },
    estado: { type: String, enum: ['Pendiente', 'Jugando', 'Agotado'], default: 'Pendiente' },
    horasJugadas: { type: Number, default: 0, min: 0 },
    desarrollador: { type: String, required: false },
}, { timestamps: true }); // Marca de tiempo para saber cuándo se creó o actualizó el juego

module.exports = mongoose.model('Juego', juegoSchema); // Exportar el modelo de Juego