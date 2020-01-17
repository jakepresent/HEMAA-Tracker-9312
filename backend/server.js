const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const Data = require('./data');

const API_PORT = 3000;
const app = express();
app.use(cors());
const router = express.Router();

const uri = "mongodb+srv://hemaa123:NuN1v4XAHn9oGpgH@hemaamembershipchecker-z2mun.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
