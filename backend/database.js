const mongoose = require("mongoose");
const uri = require("./config/keys").databaseURI;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

db = mongoose.connection;

module.exports = db;
