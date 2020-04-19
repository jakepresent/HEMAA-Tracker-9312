import React from "react";
import adminInfo from "../adminInfo";
import CsvUpload from "../components/CsvUpload";
import AdminList from "../components/AdminList";
import { AuthConsumer } from "../authContext";

const api = require("../api");

class AdminActions extends React.Component {
  constructor(props) {
    super(props);
    this.updateMembers = this.updateMembers.bind(this);
  }

  updateMembers = token => async event => {
    console.log(token);
    
    api
      .updateMembers(token)
      .then(response => {
        var message = "";
        console.log(response);
      })
      //   if (response.status === 200) {
      //     console.log("Login successful");
      //     var active = response.data.data.active;
      //     message =
      //       email + " is an " + (active ? "active" : "inactive") + " member";
      //   } else if (response.status === 204) {
      //     console.log("Member not found");
      //     message = email + " was not found";
      //   } else {
      //     console.log("Unknown status");
      //     message = email + ": unknown status";
      //   }
      //   this.setState({ status_message: message });
      // })
      .catch(function (error) {
        console.log(error);
        window.alert("Error occured: " + error);
      });
  }

  render() {
    return (
      <AuthConsumer>
        {({ accessToken }) =>
          <div>
            <h2>Admin Actions</h2>

            <button id="csvButton" className="btn btn-sm btn-primary" onClick={this.updateMembers(accessToken)}>Update Members</button>
          </div>
      }
      </AuthConsumer>
    );
  }
}

export default AdminActions;