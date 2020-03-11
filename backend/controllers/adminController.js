const keys = require("../config/keys")
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const saltRounds = 10; // 2^10 rounds

//create an admin --> requires email and password unlike the member which is just an email

createAdmin = (req, res) => {
  const body = req.body;

  if (!body || !body.email || !body.password) {
    return res.status(400).json({
      success: false,
      error: "You must provide an email and a password."
    });
  }

  bcrypt.hash(body.password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        error: "Failed to create hashed password."
      });
    }

    const admin = new Admin({ email: body.email, password: hash });
    if (!admin) {
      return res.status(400).json({ success: false, error: err });
    }

    admin
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          email: admin.email,
          message: "Admin successfully created!"
        });
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: "Failed to create an admin."
        });
      });
  });
};

getAdminByEmailandPassword = async (req, res) => {
  var body = req.body;

  if (!body || !body.email || !body.password) {
    return res.status(400).json({
      success: false,
      error: "You must provide an email and a password."
    });
  }

  var email = body.email;
  var plain_password = body.password;

  //Search by email
  await Admin.findOne({ email: email }, (err, admin) => {
    //This checks if there was an error in retrieving the admin
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    //If the admin's email does not exist in the database
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Email not found" });
    }

    var hash = admin.password;

    bcrypt.compare(plain_password, hash, function (err, result) {
      if (result == true) {
        return res
          .status(200)
          .json({ success: true, message: "Successfully logged in" });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }
    });
  }).catch(err => console.log(err));
};



module.exports = {
  createAdmin,
  getAdminByEmailandPassword
};
