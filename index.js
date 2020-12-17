//const express = require('express');
import express from 'express';
//const mongoose = require('mongoose');
import router from './routes/index.js'
import db from './config/db.js'

// crear el server
const app = express();

db.authenticate()
    .then(() => console.log('db'))
    .catch( error => console.log(error));
// conectar a mongodb
//mongoose.Promise = global.Promise;
//mongoose.connect('', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    useFindAndModify: false
//});

// habilitar pug
app.set('view engine', 'pug');

app.use( (req, res, next) => {
    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    return next();
});

//agregar body parser para leer dats de formulario
app.use(express.urlencoded({extend: true}));

// agregar router
app.use(express.static('public'));
app.use('/', router);

// definir puerto y arrancar server
const port = process.env.PORT || 4000; 

app.listen(port, () => {
    console.log("server")
})