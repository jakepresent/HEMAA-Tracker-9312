const client_id = require("../config/keys").clientID;
const client_secret = require("../config/keys").clientSecret;
const redirect_url = "http://localhost:3000/dashboard";
const auth_url = "https://accounts.tidyhq.com/oauth/authorize";

const credentials = {
  client: {
    id: client_id,
    secret: client_secret
  },
  auth: {
    tokenHost: auth_url
  }
};

loginAdmin = async (req, res) => {
  const oauth2 = require('simple-oauth2').create(credentials);

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirect_url
  });

  res.redirect(authorizationUri);

  const tokenConfig = {
    code: '<code>',
    redirect_uri: 'http://localhost:3000/dashboard',
    scope: '<scope>',
  };

  try {
    const result = await oauth2.authorizationCode.getToken(tokenConfig);
    const accessToken = oauth2.accessToken.create(result);
    return accessToken;
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
}



module.exports = {
  loginAdmin
};
