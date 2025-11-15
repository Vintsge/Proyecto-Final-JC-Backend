require('dotenv').config(); /*Conecta el archivo .env*/

// Importar dependenciasg
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); // Objeto principal donde se definir las rutas y arrancar el servidor

// Configurar el puerto desde el archivo .env o usar el puerto 3000 por defecto
const PORT = process.env.PORT || 3000; 
const MONGODB_URL = process.env.MONGODB_URL; // URL de conexión a MongoDB desde el archivo .env

// Traducir las peticiones con formato JSON
app.use(express.json());
app.use(cors()); // Habilitar CORS para permitir peticiones desde el frontend

mongoose.connect(MONGODB_URL)//Iniciar la conexión a la base de datos
    .then(() => {
        console.log('Conexión a la base de datos establecida');//Si puede => Mensaje de éxito
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', err.message);// Si no =>Mensaje de error
    });

// Importar las rutas
const juegoRoutes = require('./routes/juegoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

// Usar las rutas
app.use('/api/juegos', juegoRoutes);
app.use('/api/resenas', resenaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`); //Mensaje de éxito al iniciar el servidor
});