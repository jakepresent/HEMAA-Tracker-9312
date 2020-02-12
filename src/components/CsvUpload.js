import React from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const api = require("../api");

const CsvUpload = () => (
  <div>
    <p>Upload CSV here</p>
  </div>

);

export default CsvUpload;