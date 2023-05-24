const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));

app.use(express.json());

const photosRouter = require('./routes/photos_route.js');

app.use('/photos', photosRouter);


module.exports = app;