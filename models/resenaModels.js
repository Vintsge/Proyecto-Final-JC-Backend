const mongoose = require('mongoose');
const { Schema } = mongoose;
// Definir el esquema para el modelo de Reseña
const resenaSchema = new Schema({
    juego: {type: Schema.Types.ObjectId, ref: 'Juego', required: true}, // Referencia al juego
    autor: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    // Referencia al usuario que hizo la reseña
    calificacion: {type: Number, required: true, min: 1, max: 5}, 
    comentario: {type: String, required: [true,'El comentario es obligatorio' ]}, 
}, {timestamps: true}); // Marca de tiempo para saber cuándo se creó o actualizó la reseña 
module.exports = mongoose.model('Resena', resenaSchema); // Exportar el modelo de Reseña