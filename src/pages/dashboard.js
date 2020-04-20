import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import AdminActions from "./AdminActions";


const DashboardPage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      !authenticated ? (
        <Redirect to="/" />
      ) : (
          <div>
            <div style={{position: "relative"}}>
              <Logout />
            </div>
            <h1>Admin Dashboard</h1>
            <Profile />
            <AdminActions />
          </div>
        )
    }
  </AuthConsumer>

);

export default DashboardPage;