import React, {Component} from 'react';
import './pageHeader.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as pageHeaderActions from "../../store/pageHeader/actions";
export default class pageHeader extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-page-header">Hello! component pageHeader</div>;
    }
  }
// export default connect(
//     ({ pageHeader }) => ({ ...pageHeader }),
//     dispatch => bindActionCreators({ ...pageHeaderActions }, dispatch)
//   )( pageHeader );