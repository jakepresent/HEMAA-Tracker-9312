import React from "react";

import {AuthConsumer} from "../authContext";

const Profile = () => (
  <AuthConsumer>
    {({user}) => (
      <div>
        <br />
        <h5>{user.email}</h5>
        <br />
      </div>
    )}
  </AuthConsumer>
);

export default Profile;