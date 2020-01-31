const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "An email is required"
  },
  active: Boolean
});

module.exports = mongoose.model("Member", MemberSchema);
