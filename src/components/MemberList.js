import React from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "./Login";


const api = require("../api");




const MemberList = () => (  
    <div>
      <button type="button" class="btn btn-primary">Update Members </button>
    </div>



);

export default MemberList;