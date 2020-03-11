import React from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const api = require("../api");

const CsvUpload = () => (
  <div>
    <br />
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
      </div>
      <div class="custom-file">
        <input type="file" accept=".csv" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
      </div>
    </div>


  </div>

);

export default CsvUpload;