// const oauth2 = require('simple-oauth2')
const client_id = require("../config/keys").clientID;
const client_secret = require("../config/keys").clientSecret;
const redirect_url = "http://localhost:3000/dashboard";
// const auth_url = "https://accounts.tidyhq.com";

loginAdmin = async (req, res) => {
  const oauth2 = require('simple-oauth2').create({
    client: {
      id: client_id,
      secret: client_secret
    },
    auth: {
      tokenHost: 'https://accounts.tidyhq.com',
      tokenPath: '/oauth/token',
      authorizePath: '/oauth/authorize',
    }
  });

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_url: 'http://localhost:3000/dashboard',
    // scope: 'notification',
    // state: '3(#0/!~',
  });

  console.log(authorizationUri);
  res.redirect(authorizationUri);

  console.log("code:", req.query)

  const { code } = req.query;
  const options = {
    code,
  };

  try {
    const result = await oauth2.authorizationCode.getToken(options);

    console.log('The resulting Token: ', result)

    const token = oauth2.accessToken.create(result);

    return res.status(200).json(token);
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication Failed')
  }
}

// loginAdmin = async (req, res) => {
//   const credentials = {
//     client: {
//       id: client_id,
//       secret: client_secret
//     },
//     auth: {
//       tokenHost: 'https://accounts.tidyhq.com',
//       tokenPath: '/oauth/token',
//       authorizePath: '/oauth/authorize',
//     }
//   };

//   const oauth2 = require('simple-oauth2').create(credentials);

//   const authorizationUri = oauth2.authorizationCode.authorizeURL({
//     redirect_uri: redirect_url,
//     scope: 'notifications',
//     state: '3(#0/!~',
//   });

//   console.log("AutorizationURI:", authorizationUri)

//   res.redirect(authorizationUri);
//   const { code } = req.query;
//   const options = {
//     code,
//   }

//   // const tokenConfig = {
//   //   code: '<code>',
//   //   redirect_uri: 'http://localhost:3000/dashboard',
//   //   scope: '<scope>',
//   // };

//   try {
//     const result = await oauth2.authorizationCode.getToken(options);
//     console.log('The resulting token: ', result)

//     const accessToken = oauth2.accessToken.create(result);

//     return res.status(200).json(accessToken);

//   } catch (error) {
//     console.log('Access Token Error', error.message);
//     return res.status(500).json('Authentication failed')
//   }
// }



module.exports = {
  loginAdmin
};
