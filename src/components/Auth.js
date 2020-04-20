import React, { Component } from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "../auth0-variables";
import { AuthProvider } from "../authContext";
import { Redirect } from "react-router-dom";

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
      role: "visitor",
      email: ""
    },
    accessToken: "",
    authenticating_message: "",
  };

  initiateLogin = (email, password) => {
    this.setState({authenticating_message: "Loading..."});
    var login_info = { email: email, password: password };
    api
      .loginAdmin(login_info)
      .then(response => {
        if (response.status === 200) {
          var token = response.data.accessToken;
          console.log("Access token: " + token)
          this.setState({accessToken: token});
          this.setState({ authenticated: true });
          this.setState({authenticating_message: <Redirect to="/dashboard" />});
          this.setState({user: {role: "admin", email: email}});
        }
      })
      .catch(error => {
        this.setState({authenticating_message: "Login attempt failed"})
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

  reset = () => {
    this.setState({
      authenticating_message: ""
    })
  }

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
      accessToken: this.state.accessToken,
      logout: this.logout,
      reset: this.reset,
      authenticating_message: this.state.authenticating_message
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
