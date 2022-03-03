const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
var mongoose = require('mongoose'); 
const app = express(); 
const port = 5005;
require('dotenv').config()

let whitelist = ['http://localhost:3000'];

let corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json()); 

var mongoDB = 'mongodb://localhost:27017/appliKB'; 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error')); 

require('./api/routes')(app, express); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 