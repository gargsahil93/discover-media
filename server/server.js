'use strict';
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());

app.use(express.static('./../build', {
    extensions: ['html']
}));          //to load static content

app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on localhost:3000');
});