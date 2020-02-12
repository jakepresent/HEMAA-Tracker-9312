import React from "react";
import { Redirect } from "react-router-dom";

import "./dashboard.css";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import AdminActions from "./AdminActions";

class DashboardPage extends React.Component {

  logout() {
    window.location.href = '';
  }

  render() {
    return (

      <AuthConsumer>
        
        {({ authenticated, logout }) =>
          !authenticated ? (
            <Redirect to="/" />
          ) : (
            <div>
              {/* <div className="header" id="myHeader">
                  <h2>My Header</h2>
              </div> */}
              <div className="side">
                <div className="sidenav">
                  <a href="#">Update Members</a>
                  <hr></hr>
                  <a href="#">Admins List</a>
                  <hr></hr>
                </div>
              </div>

                <button onClick= {logout} type="button" id="logoutButton" className="btn btn-floating btn-danger float-right">Logout</button>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                  </div>
                  <div class="custom-file">
                    <input type="file" accept=".csv" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                  </div>
                </div>

            </div>




            )
        }
      </AuthConsumer>
    );
  }  
}

export default DashboardPage;