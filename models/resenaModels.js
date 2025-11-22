const mongoose = require('mongoose'); // Importa Mongoose
const { Schema } = mongoose; // Extrae la clase Schema de Mongoose

// Define el esquema para la reseña
const ResenaSchema = new mongoose.Schema({
  
  // Relaciona la reseña con un juego específico
  juego: {
    type: Schema.Types.ObjectId, // Tipo ObjectId para relacionar con otro documento
    ref: 'Juego', // Hace referencia al modelo Juego
    required: true // Campo obligatorio
  },

  puntuacion: {  
    type: Number, required: true, min: 1, max: 5 
  },

  texto: { 
    type: String, required: [true, 'El texto de la reseña es obligatorio'] 
  },
  
  autor: {
    type: String, default: 'Usuario GameTracker'
  }

}, {
  timestamps: true // Agrega automáticamente createdAt y updatedAt
});

// Exporta el modelo Resena para usarlo en controladores
module.exports = mongoose.model('Resena', ResenaSchema);