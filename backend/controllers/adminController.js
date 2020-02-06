const Admin = require(".../models/Admin");

//create an admin --> requires email and password unlike the member which is just an email

createAdmin = (req, res) => {
    const body = req.body;           
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide an email and a password."
      });
    }
  
    const admin = new Admin(body);
  
    if (!admin) {
      return res.status(400).json({ success: false, error: err });
    }
  
    admin
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          email: admin.email,
          password: admin.password,
          message: "Admin successfully created!"
        });
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: "Failed to create an admin."
        });
      });
  };

  getAdminByEmailandPassword = async (req, res) => {
   
    var inputs = {email : req.params.email, password : req.params.password};
    
    //Search by email and password 
    await Admin.findOne( inputs, (err, admin) => {
        //This checks if there was an error in retrieving the admin
        if (err) {
           return res.status(400).json({ success: false, error: err });
        }
        //If the admin's email and password do not exist in the database
        if (!admin) {
            return res.status(204).json({ success: true, message: "Admin not found" });
        }
        return res.status(200).json({ success: true, data: member });
      }).catch(err => console.log(err));
  };


module.exports = {
    createAdmin,
    getAdminByEmailandPassword,
};
