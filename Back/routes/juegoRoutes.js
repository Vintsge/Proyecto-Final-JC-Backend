const express = require('express');
const router = express.Router(); // Crear un router de Express
const juegoController = require('../controllers/juegoController'); // Importar el controlador de juegos

// Rutas para juegos
router.post('/', juegoController.crearJuego); // Crear un nuevo juego
router.get('/:id', juegoController.obtenerJuegoPorId); // Obtener un juego por ID
router.get('/', juegoController.obtenerJuegos); // Obtener todos los juegos
router.put('/:id', juegoController.actualizarJuego); // Actualizar juego
router.delete('/:id', juegoController.eliminarJuego); // Eliminar juego

module.exports = router; // Exportar el router