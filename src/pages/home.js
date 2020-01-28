import React from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const api = require("../api");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member_email: "",
      email_message: ""
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  updateEmail(event) {
    var email = event.target.value;
    this.setState({ member_email: email });
    this.setState({ email_message: "" });
  }

  handleSubmit = async event => {
    if (!this.emailIsValid(this.state.member_email)) {
      this.setState({ email_message: "Please enter a valid email address" });
      event.preventDefault();
      return;
    }
    event.preventDefault();
    alert("A name was submitted: " + this.state.member_email);

    api
      .getMemberByEmail(this.state.member_email)
      .then(function(response) {
        if (response.status === 200) {
          console.log("Login successful");
          var active = response.data.data.active;
          alert("Member found! Status: " + (active ? "Active" : "Inactive"));
        } else if (response.status === 204) {
          console.log("Member not found");
          alert("Member not found");
        } else {
          console.log("Unknown status");
          alert("Unknown status");
        }
      })
      .catch(function(error) {
        console.log(error);
        window.alert("Error occured: " + error);
      });
  };

  render() {
    return (
      <AuthConsumer>
        {({ authenticated }) =>
          authenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <div>
              <h2>Welcome to the HEMAA Membership Checker!</h2>
              <h4>
                Enter an email below to check if that member is registered:
              </h4>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                  <label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="memberEmail"
                      placeholder="Enter email"
                      onChange={this.updateEmail}
                      autoFocus
                    />
                    <span style={{ fontSize: 14 }} className="text-danger">
                      {this.state.email_message}
                    </span>
                  </label>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </form>
              <br />
              <Login />
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default HomePage;
