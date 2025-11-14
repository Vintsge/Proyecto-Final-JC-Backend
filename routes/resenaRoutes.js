const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// Rutas para reseñas
router.post('/', resenaController.crearResena);
router.get('/:id', resenaController.obtenerResenaPorId);
router.get('/', resenaController.obtenerResenas);
router.put('/:id', resenaController.actualizarResena);
router.delete('/:id', resenaController.eliminarResena);

module.exports = router;