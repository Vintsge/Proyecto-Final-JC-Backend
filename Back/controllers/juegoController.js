const juego = require('../models/juegoModels');

// CRUD - Crear un nuevo juego
exports.crearJuego = async (req, res) => {
    try {
        const nuevoJuego = new juego(req.body);
        const juegoGuardado = await nuevoJuego.save();
        res.status(201).json(juegoGuardado);
    }
    catch (error) {
        res.status(400).json({ Error: 'No se pudo crear el juego, verifique los datos enviados.', details: error.message });
    }
};

// CRUD - Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juego.find();
        res.status(200).json(juegos);
    }
    catch (error) {
        res.status(500).json({ Error: 'No se pudieron obtener los juegos.', details: error.message });
    }
};

// CRUD - Obtener un juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
    try {
        const juegoEncontrado = await juego.findById(req.params.id); // busca id desde la url
        if (!juegoEncontrado) {
            return res.status(404).json({ Error: 'Juego no encontrado.' });
        }
        res.status(200).json(juegoEncontrado);
    }
    catch (error) {
        res.status(500).json({ Error: 'No se pudo obtener el juego.', details: error.message });
    }
};

// CRUD - Actualizar un juego por ID
exports.actualizarJuego = async (req, res) => {
    try {
        const juegoActualizado = await juego.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!juegoActualizado) {
            return res.status(404).json({ Error: 'Juego no encontrado para actualizar.' });
        }
        res.status(200).json(juegoActualizado);
    }
    catch (error) {
        res.status(400).json({ Error: 'No se pudo actualizar el juego, verifique los datos enviados.', details: error.message });
    }};

// CRUD - Eliminar un juego por ID
exports.eliminarJuego = async (req, res) => {
    try {
        const juegoEliminado = await juego.findByIdAndDelete(req.params.id);   
        if (!juegoEliminado) {
            return res.status(404).json({ Error: 'Juego no encontrado para eliminar.' });
        }
        res.status(200).json({ Message: 'Juego eliminado correctamente.' });
    }
    catch (error) {
        res.status(500).json({ Error: 'No se pudo eliminar el juego.', details: error.message });
    }};