import React, { Component } from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "../auth0-variables";
import { AuthProvider } from "../authContext";
import { Redirect } from "react-router-dom";
import { json } from "body-parser";

const api = require("../api");

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: "token id_token"
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  };

  initiateLogin = (email, password) => {
    // auth.authorize();
    var login_info = { email: email, password: password };
    api
      .getAdminByEmailandPassword(login_info)
      .then(response => {
        if (response.status === 200) {
          console.log("Login successful");
          this.setState({ authenticated: true });
          return <Redirect to="/dashboard" />;
        }
      })
      .catch(function(error) {
        window.alert("Login attempt failed");
      });
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} occured`);
        return;
      }

      this.setSession(authResult.idTokenPayload);
    });
  };

  setSession(data) {
    const user = {
      id: data.sub,
      email: data.email,
      role: data[AUTH_CONFIG.roleUrl]
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
