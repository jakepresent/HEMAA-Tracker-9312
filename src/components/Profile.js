import React from "react";

import {AuthConsumer} from "../authContext";

const Profile = () => (
  <AuthConsumer>
    {({user}) => (
      <div>
        <h2>User Profile</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    )}
  </AuthConsumer>
);

export default Profile;