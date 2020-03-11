import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import AdminActions from "./AdminActions"; ~

const DashboardPage = () => (


  <AuthConsumer>
    {({ authenticated }) =>
      !authenticated ? (
        <Redirect to="/" />
      ) : (
          <div>
            <h1>Admin Dashboard</h1>
            <Logout />
            <Profile />
            <AdminActions />
          </div>
        )
    }
  </AuthConsumer>

);

export default DashboardPage;