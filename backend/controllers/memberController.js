const axios = require("axios").default;
const Member = require("../models/Member");
const { check, validationResult } = require("express-validator");

validate = (method) => {
  switch (method) {
    case "getMemberByEmail": {
      return [check("email", "Invalid email").exists().trim().isEmail()];
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
  }).catch((err) => console.log(err));
};

updateMembers = async (req, res) => {
  var token = req.headers.authorization;
  // Get list of members from TidyHQ
  axios
    .get("https://api.tidyhq.com/v1/contacts", {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      var membersObj = {};
      // Loop through all members stored in TidyHQ
      response.data.forEach(function (member) {
        var id = member.id;
        var email = member.email_address;
        membersObj[id] = {
          email: email,
          active: false,
        };
      });

      // Get all memberships from TidyHQ
      axios
        .get("https://api.tidyhq.com/v1/memberships", {
          headers: {
            authorization: token,
          },
        })
        .then((memberships) => {
          memberships.data.forEach(function (membership) {
            if (membership.state == "activated") {
              var id = membership.contact_id;
              membersObj[id].active = true;
            }
          });

          var membersArray = Object.values(membersObj);

          // Update the database of member statuses
          membersArray.forEach(function(member) {
            Member.findOneAndUpdate(
              { email: member.email },
              member,
              { upsert: true },
              function(err, db_res) {
                if (err) {
                  console.log(err);
                }
              }
            );
          });
          
          console.log("Successfully updated members");

          return res.status(200).json({ success: true, members: membersArray });
        })
        .catch((err) => {
          console.log("Unable to get memberships from TidyHQ");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Unable to get members from TidyHQ");
      console.log(err);
    });
};

module.exports = {
  validate,
  getMemberByEmail,
  updateMembers,
};
