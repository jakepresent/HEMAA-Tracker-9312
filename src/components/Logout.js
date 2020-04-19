import React from "react";

import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <button  className="btn btn-sm btn-danger" onClick={logout}>
        Logout
      </button>
    )}
  </AuthConsumer>
);

export default Logout;