const Admin = require("../models/Admin");

loginAdmin = (req, res) => {
  // TODO: Implement login functionality
};

getSaltAndHash = email => {
  // TODO: Fetch the admin's salt and hashed password
  // returns {salt: ..., expected_hash: ...}
};

hash = (password, salt) => {
  // TODO: hash & salt the plain text password for storage in database
  // returns string: hashed password
};
