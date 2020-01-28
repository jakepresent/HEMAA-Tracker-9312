const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "An email is required"
  },
  password: {
    type: String,
    required: "A password is required"
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
