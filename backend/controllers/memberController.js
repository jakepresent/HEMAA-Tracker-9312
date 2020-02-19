const Member = require("../models/Member");

createMember = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an email"
    });
  }

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
  createMember,
  getMemberByEmail
};
