const express = require('express');
const app = express();
const indexWa = require('./whatsapp/create');
var bodyParser = require('body-parser');
const { routeWA } = require('./whatsapp/wa');

// loginWA();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/wa', indexWa);
app.use('/wa', routeWA);

module.exports = app;