import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import SuccessScreen from './SuccessScreen';
import { useHistory, Link } from 'react-router-dom';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            <Link to="/success">Skip login</Link>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload = {
      "email": this.state.username,
      "password": this.state.password
    }
    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
          var successScreen = [];
          successScreen.push(<SuccessScreen appContext={self.props.appContext} />)
          self.props.appContext.setState({ loginPage: [], successScreen: successScreen })
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
}
const style = {
  margin: 15,
};
export default LoginScreen;