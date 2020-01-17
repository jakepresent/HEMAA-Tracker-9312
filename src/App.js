import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import LoginScreen from './LoginScreen';
import SuccessScreen from './SuccessScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { //add all pages here
      loginPage: []
    }
  }
  componentDidMount() {
    //sets the first page you see when opening the app
    var loginPage = [];
    loginPage.push(<LoginScreen parentContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }
  render() {
    return (
      <div className="App">
        {/*this.state.loginPage*/}
        <Router>
          <div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <LoginScreen />
              </Route>
              <Route path="/success">
                <SuccessScreen />
              </Route>
              <Route path="/">
                {/* <h2><Link to="/login">Login</Link></h2> */}
                <LoginScreen />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
