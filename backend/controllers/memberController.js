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
          .normalizeEmail()
      ];
    }
    case "createMember": {
      return [
        check("email", "Invalid email")
          .exists()
          .trim()
          .isEmail()
          .normalizeEmail(),
        check("active").isBoolean()
      ];
    }
  }
};

createMember = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const body = req.body;
  const member = new Member(body);

  if (!member) {
    return res.status(400).json({ success: false, error: err });
  }

  member
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        email: member.email,
        status: member.active,
        message: "Member successfully created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Failed to create member!"
      });
    });
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

module.exports = {
  validate,
  createMember,
  getMemberByEmail
};
