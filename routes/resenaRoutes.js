const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// Rutas para reseñas
router.post('/', resenaController.crearResena); // Crear una nueva reseña

router.get('/', resenaController.obtenerResenas); // Obtener todas las reseñas o filtrar por juego
router.put('/:id', resenaController.actualizarResena);   // Actualizar una reseña por su ID
router.delete('/:id', resenaController.eliminarResena); // Eliminar una reseña por su ID

module.exports = router;