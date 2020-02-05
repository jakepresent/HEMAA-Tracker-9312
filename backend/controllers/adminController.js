const bcrypt = require("bcrypt")
const Admin = require("../models/Admin");

createAdmin = (req, res) => {
  return res.status(501).json({
    message: "Not implemented"
  })
};

loginAdmin = (req, res) => {
  return res.status(501).json({
    message: "Not implemented"
  });
};

module.exports = {
  createAdmin,
  loginAdmin
};
