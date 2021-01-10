'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3500;
const { username, password } = require('./config/config.json');

mongoose.connect(`mongodb+srv://${username}:${password}@rest-api.jctlr.mongodb.net/<dbname>?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexión con la base de datos se ha realizado exitosamente :) !');

        app.listen(port, () => {
            console.log(`servidor corriendo en http://localhost:${port}`);
        });
    })
