// Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Ejecutar express
const app = express();

// Cargar archivo con las rutas
const routes = require('./routes/pets');

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
// Convertir cualquier peticion en JSON
app.use(bodyParser.json());

// CORS
app.use(cors({origin: true}));

// Añadir prefijos a rutas
app.use('/api', routes);

module.exports = app;