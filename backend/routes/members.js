const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/memberController");

router.post(`/create/`, MemberController.validate('createMember'), MemberController.createMember);
router.get(`/find/:email`, MemberController.validate('getMemberByEmail'), MemberController.getMemberByEmail);

module.exports = router;
