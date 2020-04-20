import React from "react";
import { AuthConsumer } from "../authContext";

const api = require("../api");

class AdminActions extends React.Component {
  constructor(props) {
    super(props);
    this.updateMembers = this.updateMembers.bind(this);
  }

  updateMembers = (token) => async (event) => {
    api.updateMembers(token).catch(function (error) {
      console.log(error);
      window.alert("Error occured: " + error);
    });
  };

  render() {
    return (
      <AuthConsumer>
        {({ accessToken }) => (
          <div>
            <h2>Admin Actions</h2>

            <button
              id="csvButton"
              className="btn btn-sm btn-primary"
              onClick={this.updateMembers(accessToken)}
            >
              Update Members
            </button>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default AdminActions;
