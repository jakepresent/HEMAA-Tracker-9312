import React from "react";
import adminInfo from "../adminInfo";
import CsvUpload from "../components/CsvUpload";
import AdminList from "../components/AdminList";


class AdminActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csv_button_clicked: false,
      admin_list_button_clicked: false
    }
    this.clickCSV = this.clickCSV.bind(this);
    this.clickAdminList = this.clickAdminList.bind(this);
  }

  clickCSV(event) {
    var button = document.getElementById("csvButton");
    if (!this.state.csv_button_clicked) {
      this.setState({
        csv_button_clicked: true,
        admin_list_button_clicked: false
      });
      button.className = "btn btn-sm btn-secondary";
      document.getElementById("adminListButton").className = "btn btn-sm btn-primary";
    } else {
      this.setState({
        csv_button_clicked: false
      });
      button.className = "btn btn-sm btn-primary";
    }
  }

  clickAdminList(event) {
    var button = document.getElementById("adminListButton");
    if (!this.state.admin_list_button_clicked) {
      this.setState({
        admin_list_button_clicked: true,
        csv_button_clicked: false
      });
      button.className = "btn btn-sm btn-secondary";
      document.getElementById("csvButton").className = "btn btn-sm btn-primary";
    } else {
      this.setState({
        admin_list_button_clicked: false
      });
      button.className = "btn btn-sm btn-primary";
    }
  }

  render() {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <div>
        <h2>Admin Actions</h2>

        <p>List of members last updated on: {(new Date(adminInfo.lastUpdated)).toDateString()}</p>
        <button id="csvButton"
          className="btn btn-sm btn-primary"
          onClick={this.clickCSV}>
          {this.state.csv_button_clicked ?
            "Back" : "Upload member list (*.csv)"}
        </button>
        <br />
        <button id="adminListButton"
          className="btn btn-sm btn-primary"
          onClick={this.clickAdminList}>
          {this.state.admin_list_button_clicked ?
            "Back" : "View Admins List"}
        </button>
        <br />
        {
          !this.state.csv_button_clicked ? (
            <div></div>
          ) : (
              <CsvUpload />
            )
        }
        {
          !this.state.admin_list_button_clicked ? (
            <div></div>
          ) : (
              <AdminList />
            )
        }
      </div>
    );
  }
}

export default AdminActions;