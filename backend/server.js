const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const chalk = require("chalk");
const API_PORT = 3001;
const memberRouter = require("./routes/members");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
app.use(`/api/member`, memberRouter);

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