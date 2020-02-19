import React, {Component} from '../../../node_modules/react';
import './Password.css'

export default class Password extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return(
        <div className="Password" id="Password">
            <label for="passwordInput">Enter Password</label>
            <input type = "text"  class="form-control" id="passwordInput" placeholder="password..."></input>
        </div>
      );
  }
}