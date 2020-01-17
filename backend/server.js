const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3000;
const app = express();
app.use(cors());
const router = express.Router();

const uri = "mongodb+srv://hemaa123:<password>@hemaamembershipchecker-z2mun.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
