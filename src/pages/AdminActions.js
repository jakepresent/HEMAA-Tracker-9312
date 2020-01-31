import React from "react";
import adminInfo from "../adminInfo";


class AdminActions extends React.Component {

  render() {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <div>
        <h2>Admin Actions</h2>
        
        <p>List of members last updated on: {(new Date(adminInfo.lastUpdated)).toDateString()}</p>
      </div>
    );
  }
}

export default AdminActions;