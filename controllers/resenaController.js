const resena = require('../models/resenaModels');

// CRUD - Crear una nueva reseña
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new resena(req.body);
        const resenaGuardada = await nuevaResena.save();
        res.status(201).json(resenaGuardada);
    } catch (error) {
        res.status(400).json({ Error: 'No se pudo crear la reseña, verifique los datos enviados.', details: error.message });
    }
};

// CRUD - Obtener todas las reseñas
exports.obtenerResenas = async (req, res) => {
    try {
        // Permite filtrar reseñas por el ID del juego si se envía en la query
        const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};// Es un if, escrito de forma corta

        // Busca reseñas y trae el nombre del juego relacionado usando populate 
        const resenas = await Resena.find(filtro).populate('juego', 'nombre');
        res.status(200).json(resenas); // Retorna las reseñas con código 200
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas' });
    }
};

// CRUD - Obtener una reseña por ID
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const obtenerResenasporId = await resena.findById(req.params.id).populate('juego', 'nombre'); // busca id desde la url
        if (!obtenerResenasporId) {
            return res.status(404).json({ Error: 'Reseña no encontrada.' });
        }
        res.status(200).json(obtenerResenasporId);
    } catch (error) {
        res.status(500).json({ Error: 'No se pudo obtener la reseña.', details: error.message });
    }
};

// CRUD - Actualizar una reseña 
exports.actualizarResena = async (req, res) => {
    try {
        const resenaActualizada = await resena.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve la reseña actualizada
            runValidators: true
        }); // Valida que los datos según el esquema/modelo

        if (!resenaActualizada) {
            return res.status(404).json({ Error: 'Reseña no encontrada para actualizar.' });
        }
        res.status(200).json(resenaActualizada);
    } catch (error) {
        res.status(400).json({ Error: 'No se pudo actualizar la reseña, verifique los datos enviados.', details: error.message });
    }
};

// CRUD - Eliminar una reseña 
exports.eliminarResena = async (req, res) => {
    try {
        const resenaEliminada = await resena.findByIdAndDelete(req.params.id);  
        if (!resenaEliminada) {
            return res.status(404).json({ Error: 'Reseña no encontrada para eliminar.' });
        } res.status(200).json({ Message: 'Reseña eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ Error: 'No se pudo eliminar la reseña.', details: error.message });
    }};
