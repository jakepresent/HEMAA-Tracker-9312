const mongoose = require("mongoose");
const chalk = require("chalk");
const uri = require("./config/keys").databaseURI;

// Configurations
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Open connection
mongoose
  .connect(uri)
  .then(() => console.log(chalk.green("MongoDB successfully connected")))
  .catch(err => console.log(err));

db = mongoose.connection;

module.exports = db;
