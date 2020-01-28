const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const API_PORT = 3001;
const memberRouter = require("./routes/members");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
app.use(`/api/member`, memberRouter);

// Launch backend
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
