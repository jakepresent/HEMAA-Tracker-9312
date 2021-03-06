const axios = require("axios").default;
const client_id = require("../config/keys").clientID;
const client_secret = require("../config/keys").clientSecret;

loginAdmin = async (req, res) => {
  axios
    .post("https://accounts.tidyhq.com/oauth/token", null, {
      params: {
        domain_prefix: 'hemaa',
        client_id: client_id,
        client_secret: client_secret,
        username: req.body.email,
        password: req.body.password,
        grant_type: 'password'
      }
    })
    .then(function(response) {
      if (response.status === 200) {
        var token = response.data.access_token;
        return res.status(200).json({success: true, accessToken: token});
      }
    })
    .catch(function(error) {
      console.log("Failed login attempt");
      return res.status(400).json({success: false, message: error});
    });
};

module.exports = {
  loginAdmin
};
