const Resena = require('../models/resenaModels');
const Juego = require('../models/juegoModels'); // modelo de juego

// Crear una nueva reseña
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body);
        const resenaGuardada = await nuevaResena.save();
        res.status(201).json(resenaGuardada);
    } catch (error) {
        res.status(400).json({ 
            Error: 'No se pudo crear la reseña, verifique los datos enviados.', 
            details: error.message 
        });
    }
};

// Obtener todas las reseñas (opcionalmente filtradas por juego, nombreJuego o calificación)

exports.obtenerResenas = async (req, res) => {
  try {
    const filtro = {};

    // Filtrar por calificación
    if (req.query.calificacion) {
      filtro.puntuacion = req.query.calificacion;
    }

    // Filtrar por juegoId
    if (req.query.juegoId) {
      filtro.juego = req.query.juegoId;
    }

    // Filtrar por nombre de juego
    if (req.query.nombreJuego) {
      const juegos = await Juego.find({
        nombre: { $regex: req.query.nombreJuego, $options: "i" }
      });

      if (juegos.length === 0) return res.status(200).json([]); // ningún juego coincide

      filtro.juego = { $in: juegos.map(j => j._id) };
    }

    const resenas = await Resena.find(filtro).populate("juego", "nombre");
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reseñas", details: error.message });
  }
};

// Actualizar una reseña
exports.actualizarResena = async (req, res) => {
    try {
        const resenaActualizada = await Resena.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!resenaActualizada) return res.status(404).json({ Error: 'Reseña no encontrada para actualizar.' });
        res.status(200).json(resenaActualizada);
    } catch (error) {
        res.status(400).json({ 
            Error: 'No se pudo actualizar la reseña, verifique los datos enviados.', 
            details: error.message 
        });
    }
};

// Eliminar una reseña
exports.eliminarResena = async (req, res) => {
    try {
        const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
        if (!resenaEliminada) return res.status(404).json({ Error: 'Reseña no encontrada para eliminar.' });
        res.status(200).json({ Message: 'Reseña eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ Error: 'No se pudo eliminar la reseña.', details: error.message });
    }
};
