const app = require('./app');
const http = require('http');
const port = process.env.PORT || 3000;
const express = require('express');
http.createServer(app).listen(port, () => {
    console.log('Example app listening on port 3000!')
})