const axios = require("axios").default;
const Member = require("../models/Member");
const { check, validationResult } = require("express-validator");

validate = method => {
  switch (method) {
    case "getMemberByEmail": {
      return [
        check("email", "Invalid email")
          .exists()
          .trim()
          .isEmail()
      ];
    }
  }
};

getMemberByEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  await Member.findOne({ email: req.params.email }, (err, member) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!member) {
      return res
        .status(204)
        .json({ success: true, message: "Member not found" });
    }
    return res.status(200).json({ success: true, data: member });
  }).catch(err => console.log(err));
};

updateMembers = async (req, res) => {
  var token = req.headers.authorization;
  // Get list of members from TidyHQ
  axios
    .get("https://api.tidyhq.com/v1/contacts", {
      headers: {
        authorization: token
      }
    })
    .then(response => {
      // Filter out all fields except email and status
      var membersArray = [];
      response.data.forEach(function(member) {
        membersArray.push({
          email: member.email_address,
          active: member.status == "active"
        });
      });

      // Create members if they do not exist, otherwise update
      membersArray.forEach(function(data) {
        Member.findOneAndUpdate(
          { email: data.email },
          data,
          { upsert: true },
          function(err, res) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
      // Return response with array of member JSONs
      return res.status(200).json({ success: true, members: membersArray });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        message: "Failed to get members",
        error: error
      });
    });
};

module.exports = {
  validate,
  getMemberByEmail,
  updateMembers
};
