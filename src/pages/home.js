import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

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
    this.setState({ member_email: email })
    this.setState({ email_message: "" });
  }

  handleSubmit(event) {
    if (!this.emailIsValid(this.state.member_email)) {
      this.setState({ email_message: "Please enter a valid email address" });
      event.preventDefault();
      return;
    }
    event.preventDefault();
    alert('An email was submitted: ' + this.state.member_email);
    var apiBaseUrl = "http://localhost:4000/api/";
      var payload = {
        "email": this.state.member_email,
      }
      axios.post(apiBaseUrl + 'member_email', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("Login successfull");
          }
          else if (response.data.code === 204) {
            console.log("Username password do not match");
            alert("username password do not match")
          }
          else {
            console.log("Username does not exist");
            alert("Username does not exist");
          }
        })
        .catch(function (error) {
          console.log(error);
          window.alert("Could not log in: " + error);
        });
  }

  render() {
    return (
      <AuthConsumer>
        {({ authenticated }) =>
          authenticated ? (
            <Redirect to="/dashboard" />
          ) : (
              <div>
                <h2>Welcome to the HEMAA Membership Checker!</h2>
                <h4>Enter an email below to check if that member is registered:</h4>
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className='form-group'>
                    <label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="memberEmail"
                      placeholder="Enter email"
                      onChange={this.updateEmail}
                      autoFocus />
                      <span style={{fontSize:14}}className="text-danger">
                        {this.state.email_message}
                      </span>
                    </label>
                  </div>
                  <input type="submit" className="btn btn-primary"
                    value="Submit" />
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