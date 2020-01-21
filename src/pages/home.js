import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
          <div>
            <h2>Welcome to the HEMAA Membership Checker</h2>
            <Login />
          </div>
        )
    }
  </AuthConsumer>
);

export default HomePage;