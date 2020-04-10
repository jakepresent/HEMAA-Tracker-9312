const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const db = require("./database");
const router = require("./routes");
const API_PORT = 3001;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
app.use(`/api/`, router);

// Launch backend
var server = app.listen(API_PORT, () => console.log(chalk.cyan(`LISTENING ON PORT ${API_PORT}`)));

// Close backend
process.on("SIGINT", function() {
  db.close(function() {
    console.log(chalk.magentaBright("Database connection closed due to application termination"))
  });
  server.close(function() {
    console.log(chalk.magentaBright("Server closed due to application termination"));
  });
});