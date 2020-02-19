import React from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const api = require("../api");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      email_message: "",
      status_message: "",
      admin_button_text: "Admin Login",
      admin_logging_in: false,
      admin_email: "",
      admin_password: "",
      admin_email_message: "",
      admin_status_message: ""
    };
    this.updateText = this.updateText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickAdminLogin = this.clickAdminLogin.bind(this);
  }

  emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  updateText(event) {
    console.log(event);
    const { target: { name, value } } = event
    var email = event.target.value;
    this.setState({ [name]: event.target.value });
    this.setState({ email_message: "", admin_email_message: "" });
  }

  handleSubmit = async event => {
    if (!this.emailIsValid(this.state.email)) {
      this.setState({ email_message: "Please enter a valid email address" });
      event.preventDefault();
      return;
    }
    event.preventDefault();
    var email = this.state.email;
    api
      .getMemberByEmail(email)
      .then((response) => {
        var message = "";
        if (response.status === 200) {
          console.log("Login successful");
          var active = response.data.data.active;
          message = email + " is an " + (active ? "active" : "inactive") + " member";
        } else if (response.status === 204) {
          console.log("Member not found");
          message = email + " was not found"
        } else {
          console.log("Unknown status");
          message = email + ": unknown status";
        }
        this.setState({ status_message: message });
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Error occured: " + error);
      });
  };

  handleAdminSubmit = loginFunction => async event => {
    if (!this.emailIsValid(this.state.admin_email)) {
      this.setState({ admin_email_message: "Please enter a valid email address" });
      event.preventDefault();
      return;
    }
    event.preventDefault();
    var email = this.state.admin_email;
    var password = this.state.admin_password;
    var message = loginFunction(email, password);
    this.setState({ admin_status_message: message })
    /*api
      .getMemberByEmail(email)
      .then((response) => {
        var message = "";
        if (response.status === 200) {
          console.log("Login successful");
          var active = response.data.data.active;
          message = email + " is an " + (active ? "active" : "inactive") + " member";
        } else if (response.status === 204) {
          console.log("Member not found");
          message = email + " was not found"
        } else {
          console.log("Unknown status");
          message = email + ": unknown status";
        }
        this.setState({ status_message: message });
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Error occured: " + error);
      });*/

  };

  clickAdminLogin(event) {
    var button = document.getElementById("adminLogin");
    if (!this.state.admin_logging_in) {
      this.setState({
        admin_button_text: "Back",
        admin_logging_in: true
      });
      button.className = "btn btn-sm btn-secondary";
    } else {
      this.setState({
        admin_button_text: "Admin Login",
        admin_logging_in: false
      });
      button.className = "btn btn-sm btn-primary";
    }
  }

  render() {
    return (
      <AuthConsumer>
        {({ authenticated, initiateLogin }) =>
          authenticated ? (
            <Redirect to="/dashboard" />
          ) : (
              <div>
                <h2>Welcome to the HEMAA Membership Checker!</h2>
                <h5>
                  Enter an email below to check if that member is registered
                </h5>
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group">
                    <label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="memberEmail"
                        placeholder="Enter email"
                        onChange={this.updateText}
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
                <div>
                  <br />
                  <h4>
                    {this.state.status_message}
                  </h4>
                  <br />
                </div>
                <button id="adminLogin" className="btn btn-sm btn-primary" onClick={this.clickAdminLogin}>
                  {this.state.admin_button_text}
                </button>
                {
                  !this.state.admin_logging_in ? (
                    <div></div>
                  ) : (
                      <div>
                        <br />
                        <h5>Admin Login</h5>
                        <form onSubmit={this.handleAdminSubmit(initiateLogin)} noValidate>
                          <div className="form-group">
                            <label>
                              <input
                                type="text"
                                name="admin_email"
                                className="form-control"
                                placeholder="Enter admin email"
                                onChange={this.updateText}
                                autoFocus
                              />
                              <span style={{ fontSize: 14 }} className="text-danger">
                                {this.state.admin_email_message}
                              </span>
                            </label>
                            <br />
                            <label>
                              <input
                                type="password"
                                name="admin_password"
                                className="form-control"
                                placeholder="Enter admin password"
                                onChange={this.updateText}
                              />
                            </label>
                          </div>
                          <input
                            type="submit"
                            className="btn btn-primary"
                            value="Submit"
                          />
                        </form>
                        <div>
                          <br />
                          <h4>
                            {this.state.admin_status_message}
                          </h4>
                          <br />
                        </div>
                      </div>
                    )
                }
              </div>
            )
        }
      </AuthConsumer>
    );
  }
}

export default HomePage;
