const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/memberController");

router.post(`/create/`, MemberController.createMember);
router.get(`/find/:email`, MemberController.getMemberByEmail);

module.exports = router;
