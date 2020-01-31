import React, {Component} from '../../../node_modules/react';
import './Email.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as emailActions from "../../store/email/actions";
export default class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
      return( 
        <div className="Email">
          <label for="emailInput">Email address</label>
          <input type="email" class="form-control" id="emailInput" placeholder="Enter email"></input>
        </div>
      );  
    };
  };
// export default connect(
//     ({ email }) => ({ ...email }),
//     dispatch => bindActionCreators({ ...emailActions }, dispatch)
//   )( email );