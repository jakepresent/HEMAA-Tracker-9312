import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CallbackPage from "./pages/callback";
import Auth from "./components/Auth";
import header_img from './components/header.png'

function App() {
  return (
    <div className="App container" >
      <Auth>
        <div className="header">
          <img src={header_img} style={{width: '30%', margin: 'auto', marginBottom: '10px', display: 'flex'}}/>
          <h3 style={{margin: 'auto', marginBottom: '10px', textAlign: 'center'}}>HEMAA Membership Checker</h3>
        </div>
        <div className="jumbotron" style={{textAlign:"center", margin: "auto", width: "70%", padding: "2em",
                        borderRadius: "2em", }}>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/callback" component={CallbackPage} />
            </Switch>
          </Router>
        </div>
      </Auth>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);