import React from "react";
import { AuthConsumer } from "../authContext";

const api = require("../api");

class AdminActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonText: "Update Members"}
    this.updateMembers = this.updateMembers.bind(this);
  }

  updateMembers = token => async event => {
    
    this.setState({buttonText: "Loading..."})
    
    api
      .updateMembers(token)
      .then(response => {
        var message = "";
        if (response.status === 200) {
          console.log(response);
          this.setState({buttonText: "Update Members"});
          console.log("Member update successful");
          window.alert("Member list synced with TidyHQ successfully");
        }
      })
      .catch(function (error) {
        this.setState({buttonText: "Update Members"})
        console.log(error);
        window.alert("Error occured syncing member list with TidyHQ: " + error);
      });
      this.setState({buttonText: "Updating..."})
  }

  render() {
    return (
      <AuthConsumer>
        {({ accessToken }) => (
          <div>
            <h2>Admin Actions</h2>

            <button id="updateButton" className="btn btn-sm btn-primary" onClick={this.updateMembers(accessToken)}>
              {this.state.buttonText}
            </button>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default AdminActions;
